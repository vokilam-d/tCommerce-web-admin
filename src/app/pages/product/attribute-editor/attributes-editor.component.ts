import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttributeService } from '../../../shared/services/attribute.service';
import { AttributeDto, AttributeValueDto } from '../../../shared/dtos/attribute.dto';
import { ProductVariantDto } from '../../../shared/dtos/product-variant.dto';
import { ProductDto } from '../../../shared/dtos/product.dto';
import { NgUnsubscribe } from '../../../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';
import { EAttributeType } from '../../../shared/enums/attribute-type.enum';

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
export class AttributesEditorComponent extends NgUnsubscribe implements OnInit {

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

  constructor(public attributeService: AttributeService) {
    super();
  }

  ngOnInit() {
    this.attributeService.attributes$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(attributes => {
        this.attributes = this.transformResponse(attributes);
      });
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

  private transformResponse(attributeDtos: AttributeDto[]): Attribute[] {
    return attributeDtos.map(attributeDto => {
      const values: AttributeValue[] = attributeDto.values.map(valueDto => {
        const isSelected = this.initialFormValue.attributes.find(a => a.valueIds.includes(valueDto.id))
          || this.initialFormValue.variants.find(v => v.attributes.find(a => a.valueIds.includes(valueDto.id)));

        return {
          ...valueDto,
          isSelected: !!isSelected
        };
      });

      return {
        ...attributeDto,
        values,
        isSelected: values.some(v => v.isSelected)
      };
    });
  }

  getPreGeneratedAttrLabel(attribute: Attribute) {
    return this.attributeService.getValueLabel(attribute.id, attribute.values.map(v => v.id));
  }
}
