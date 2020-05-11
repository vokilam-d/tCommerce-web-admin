import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectComponent } from '../select/select.component';
import { AttributeService } from '../../services/attribute.service';
import { ProductSelectedAttributeDto } from '../../dtos/selected-attribute.dto';
import { ISelectOption } from '../select/select-option.interface';
import { AttributeDto } from '../../dtos/attribute.dto';
import { takeUntil } from 'rxjs/operators';
import { EAttributeType } from '../../enums/attribute-type.enum';

@Component({
  selector: 'attribute-select',
  templateUrl: './attribute-select.component.html',
  styleUrls: ['./attribute-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AttributeSelectComponent),
    multi: true
  }]
})
export class AttributeSelectComponent extends SelectComponent implements OnInit, ControlValueAccessor, OnDestroy {

  attribute: AttributeDto;
  @Input('selectedAttr') productSelectedAttr: ProductSelectedAttributeDto;

  constructor(private attributeService: AttributeService,
              private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    if (!this.productSelectedAttr) {
      throw new Error(`Input property 'productSelectedAttr' is mandatory`);
    }

    this.attributeService.attributes$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(attributes => {
        this.attribute = attributes.find(attr => this.productSelectedAttr.attributeId === attr.id);

        if (this.attribute) {
          this.options = this.attribute.values.map(value => ({ data: value.id, view: value.label })) || [];
          if (this.attribute.type === EAttributeType.MultiSelect) {
            this.isMultiSelect = true;
          }
        }

        this.markSelectedOptions();
        this.cdr.markForCheck();
      });
  }

}
