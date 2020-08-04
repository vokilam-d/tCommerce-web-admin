import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { AttributeService } from '../../../shared/services/attribute.service';
import { AttributeDto, AttributeValueDto } from '../../../shared/dtos/attribute.dto';
import { ProductVariantDto } from '../../../shared/dtos/product-variant.dto';
import { ProductDto } from '../../../shared/dtos/product.dto';
import { NgUnsubscribe } from '../../../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';
import { finalize, takeUntil } from 'rxjs/operators';
import { EAttributeType } from '../../../shared/enums/attribute-type.enum';
import { IGridCell, IGridValue } from '../../../grid/grid.interface';
import { NotyService } from '../../../noty/noty.service';
import { getPropertyOf } from '../../../shared/helpers/get-property-of.function';
import { ProductSelectedAttributeDto } from '../../../shared/dtos/selected-attribute.dto';

enum ESelectionStep {
  SelectAttributes,
  AttributeValues,
  // Images,
  // Summary
}

class SelectedAttributeValue extends AttributeValueDto {
  isSelected: boolean;
}

class SelectedAttribute extends AttributeDto {
  values: SelectedAttributeValue[];
}

interface ITruncatedVariant {
  [attrId: string]: SelectedAttributeValue['id'];
}

@Component({
  selector: 'attributes-editor',
  templateUrl: './attributes-editor.component.html',
  styleUrls: ['./attributes-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributesEditorComponent extends NgUnsubscribe implements OnInit {

  isVisible: boolean = false;
  activeStep: ESelectionStep = ESelectionStep.SelectAttributes;
  attributes: AttributeDto[] = [];
  selectedAttributes: SelectedAttribute[] = [];

  preGeneratedAttrsForProduct: AttributeDto[] = [];
  variantsToCreate: ITruncatedVariant[] = [];
  variantsToLeave: ProductVariantDto[] = [];
  get variantsToRemove(): ProductVariantDto[] {
    if (this.initialFormValue.variants.length === 1) {
      return [];
    } else {
      return this.initialFormValue.variants.filter(v => !this.variantsToLeave.includes(v))
    }
  };

  stepsEnum = ESelectionStep;

  itemsTotal: number = 0;
  itemsFiltered: number;
  pagesTotal: number = 1;
  isGridLoading: boolean = false;
  gridCells: IGridCell[] = attributeGridCells;

  @Input() initialFormValue: ProductDto;
  @Output('generated') generatedEmitter = new EventEmitter<ProductDto>();

  constructor(public attributeService: AttributeService,
              private notyService: NotyService,
              private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.attributeService.attributes$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(attributes => {
        this.selectedAttributes = [];
        this.attributes = this.transformResponse(attributes);
        this.itemsTotal = this.attributes.length;
        this.cdr.markForCheck();
      });
  }

  show() {
    this.isVisible = true;
    this.attributes = [];
    this.attributeService.setAttributes();
  }

  hide() {
    this.isVisible = false;
    this.resetPreGenerated();
    this.activeStep = ESelectionStep.SelectAttributes;
  }

  private resetPreGenerated() {
    this.preGeneratedAttrsForProduct = [];
    this.variantsToCreate = [];
    this.variantsToLeave = [];
  }

  prevStep() {
    if (this.activeStep === ESelectionStep.SelectAttributes) {
      return;
    }

    --this.activeStep;
  }

  nextStep() {
    // if (this.activeStep === ESelectionStep.Summary) {
    if (this.activeStep === ESelectionStep.AttributeValues) {
      this.preGenerateVariants(); // remove this line after uncomment ESelectionStep.Summary
      this.finish();
    } else {
      ++this.activeStep;
    }

    // if (this.activeStep === ESelectionStep.Summary) {
    //   this.preGenerateVariants();
    // }
  }

  private preGenerateVariants() {
    this.resetPreGenerated();

    const attributesForVariants: AttributeDto[] = [];
    const selectedAttributesWithSelectedValues: SelectedAttribute[] = this.selectedAttributes.map(attr => {
      return { ...attr, values: attr.values.filter(v => v.isSelected) };
    });

    selectedAttributesWithSelectedValues.forEach(selectedAttr => {
      if (selectedAttr.type === EAttributeType.MultiSelect || selectedAttr.values.length === 1) {
        this.preGeneratedAttrsForProduct.push(selectedAttr);
      } else {
        attributesForVariants.push(selectedAttr);
      }
    });

    const truncVariants: ITruncatedVariant[] = [];
    const populateTruncVariants = (variant: ITruncatedVariant = {}, attrIdx = 0, valueIdx = 0) => {
      const attr = attributesForVariants[attrIdx];
      if (!attr) { return; }
      const value = attr.values[valueIdx];
      if (!value) { return; }

      variant = JSON.parse(JSON.stringify(variant));
      variant[attr.id] = value.id;

      if (attributesForVariants[attrIdx + 1]) {
        populateTruncVariants(variant, attrIdx + 1, 0);
      } else {
        truncVariants.push(variant);
      }

      if (attr.values[valueIdx + 1]) {
        populateTruncVariants(variant, attrIdx, valueIdx + 1);
      }
    };
    populateTruncVariants();

    truncVariants.forEach(truncVariant => {
      const found = this.initialFormValue.variants.find(variant => {
        return Object.keys(truncVariant).every(attributeId => {
          const foundAttr = variant.attributes.find(attr => {
            return attr.attributeId === attributeId && attr.valueIds.includes(truncVariant[attributeId]);
          });
          return !!foundAttr;
        });
      });

      if (found) {
        this.variantsToLeave.push(found);
      } else {
        this.variantsToCreate.push(truncVariant);
      }
    });
  }

  private finish() {
    let variants: ProductVariantDto[] = [...this.variantsToLeave];

    if (variants.length === 0 && this.variantsToCreate.length === 0) {
      variants = this.initialFormValue.variants;
    }

    this.variantsToCreate.forEach((truncVariant, index) => {

      let newVariant: ProductVariantDto;
      if (this.initialFormValue.variants.length === 1 && index === 0) {
        newVariant = this.initialFormValue.variants[0];
      } else {
        newVariant = new ProductVariantDto();
      }

      Object.keys(truncVariant).forEach(attributeId => {
        newVariant.attributes.push({
          attributeId,
          valueIds: [truncVariant[attributeId]]
        });
      });

      variants.push(newVariant);
    });

    if (variants.length === 0 && this.variantsToRemove[0]) {
      variants.push({
        ...this.variantsToRemove[0],
        attributes: []
      });
    }

    const changedFormValue: ProductDto = {
      ...this.initialFormValue,
      attributes: this.preGeneratedAttrsForProduct.map(a => ({
        attributeId: a.id,
        valueIds: a.values.map(attrValue => attrValue.id)
      })),
      variants
    };

    this.generatedEmitter.emit(changedFormValue);
    this.hide();
  }

  private transformResponse(attributeDtos: AttributeDto[]): AttributeDto[] {
    const hasAttributeValue = (attributes: ProductSelectedAttributeDto[], attributeId: string, valueId: string) => {
      return !!attributes.find(attr => attr.attributeId === attributeId && attr.valueIds.includes(valueId));
    }

    return attributeDtos.map(attributeDto => {
      const values: SelectedAttributeValue[] = attributeDto.values.map(valueDto => {
        const isSelected = hasAttributeValue(this.initialFormValue.attributes, attributeDto.id, valueDto.id)
          || this.initialFormValue.variants.find(v => hasAttributeValue(v.attributes, attributeDto.id, valueDto.id));

        return {
          ...valueDto,
          isSelected: !!isSelected
        };
      });

      const selectedAttribute = {
        ...attributeDto,
        values
      };

      if (values.some(v => v.isSelected) && !this.selectedAttributes.find(s => s.id === attributeDto.id)) {
        this.selectedAttributes.push(selectedAttribute);
      }

      return selectedAttribute
    });
  }

  getPreGeneratedAttrLabel(attribute: AttributeDto) {
    return this.attributeService.getValueLabel(attribute.id, attribute.values.map(v => v.id));
  }

  fetchAttributes(gridValue: IGridValue) {
    this.isGridLoading = true;
    this.cdr.detectChanges();

    this.attributeService.fetchAttributes(gridValue)
      .pipe(this.notyService.attachNoty(), finalize(() => this.isGridLoading = false))
      .subscribe(
        response => {
          this.attributes = this.transformResponse(response.data);
          this.itemsTotal = response.itemsTotal;
          this.pagesTotal = response.pagesTotal;
          this.itemsFiltered = response.itemsFiltered;

          this.cdr.markForCheck();
        }
      )
  }

  toggleAttribute(attribute: SelectedAttribute, state?: boolean) {
    const selectedAttributeIdx = this.selectedAttributes.findIndex(selectedAttribute => selectedAttribute.id === attribute.id);

    state = selectedAttributeIdx === -1;

    if (state === true && selectedAttributeIdx === -1) {
      this.selectedAttributes.push(attribute);
    } else if (state === false && selectedAttributeIdx !== -1) {
      this.selectedAttributes.splice(selectedAttributeIdx, 1);
    }
  }

  isSelected(attribute: SelectedAttribute): boolean {
    return !!this.selectedAttributes.find(selectedAttribute => selectedAttribute.id === attribute.id);
  }
}

const attributeGridCells: IGridCell[] = [
  {
    isSearchable: false,
    label: '',
    initialWidth: 100,
    align: 'left',
    isImage: false,
    isSortable: false,
    fieldName: ''
  },
  {
    isSearchable: true,
    label: 'ID',
    initialWidth: 250,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<AttributeDto>('id')
  },
  {
    isSearchable: true,
    label: 'Label',
    initialWidth: 500,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<AttributeDto>('label')
  }
];
