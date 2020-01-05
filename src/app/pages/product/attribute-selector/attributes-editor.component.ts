import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttributeService } from '../../../shared/services/attribute.service';
import { NotyService } from '../../../noty/noty.service';
import { AttributeDto, AttributeValueDto } from '../../../shared/dtos/attribute.dto';
import { ProductVariantDto } from '../../../shared/dtos/product-variant.dto';
import { ProductDto } from '../../../shared/dtos/product.dto';

enum ESelectionStep {
  SelectAttributes,
  AttributeValues,
  Images,
  Summary
}

class AttributeValue extends AttributeValueDto {
  isSelected: boolean;
}

class Attribute extends AttributeDto {
  isSelected: boolean;
  values: AttributeValue[];
}

interface ITruncatedVariant {
  [attrId: string]: AttributeValue['id'];
}

@Component({
  selector: 'attributes-editor',
  templateUrl: './attributes-editor.component.html',
  styleUrls: ['./attributes-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributesEditorComponent implements OnInit {

  isVisible: boolean = false;
  activeStep: ESelectionStep = ESelectionStep.SelectAttributes;
  attributes: Attribute[] = [];
  get selectedAttributes(): Attribute[] { return this.attributes.filter(a => a.isSelected); }

  preGeneratedAttrsForProduct: Attribute[] = [];
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

  @Input() initialFormValue: ProductDto;
  @Output('generated') generatedEmitter = new EventEmitter<ProductDto>();

  constructor(private attributeService: AttributeService,
              private notyService: NotyService) { }

  ngOnInit() {
    this.attributeService.fetchAttributes().pipe(this.notyService.attachNoty()).subscribe(
      response => {
        this.attributes = this.transformResponse(response.data);
      }
    );
  }

  show() {
    this.isVisible = true;
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
    if (this.activeStep === ESelectionStep.Summary) {
      this.finish();
    } else {
      ++this.activeStep;
    }

    if (this.activeStep === ESelectionStep.Summary) {
      this.preGenerateVariants();
    }
  }

  private preGenerateVariants() {
    this.resetPreGenerated();

    const attributesForVariants: Attribute[] = [];
    const selectedAttributesWithSelectedValues: Attribute[] = this.selectedAttributes.map(attr => {
      return { ...attr, values: attr.values.filter(v => v.isSelected) };
    });

    selectedAttributesWithSelectedValues.forEach(selectedAttr => {
      if (selectedAttr.values.length === 1) {
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
            return attr.attributeId === attributeId && attr.valueId === truncVariant[attributeId];
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
    const variants: ProductVariantDto[] = [...this.variantsToLeave];
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
          valueId: truncVariant[attributeId]
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
      attributes: this.preGeneratedAttrsForProduct.map(a => ({ attributeId: a.id, valueId: a.values[0].id })),
      variants
    };

    this.generatedEmitter.emit(changedFormValue);
    this.hide();
  }

  private transformResponse(attributeDtos: AttributeDto[]): Attribute[] {
    return attributeDtos.map(attributeDtos => {
      const values: AttributeValue[] = attributeDtos.values.map(valueDto => {
        return {
          ...valueDto,
          isSelected: false
        };
      });

      return {
        ...attributeDtos,
        values,
        isSelected: false
      };
    });
  }
}
