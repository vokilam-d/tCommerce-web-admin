import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CategoryTreeItem } from '../shared/dtos/category.dto';
import { ResponseDto } from '../shared/dtos/response.dto';
import { API_HOST } from '../shared/constants/constants';
import { ProductCategoryDto } from '../shared/dtos/product.dto';

type CategorySelectOption = CategoryTreeItem & { isSelected: boolean; children: CategorySelectOption[]; };

@Component({
  selector: 'category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CategorySelectComponent),
    multi: true
  }]
})
export class CategorySelectComponent implements OnInit, ControlValueAccessor {

  isVisible: boolean = false;
  isDisabled: boolean = false;
  options: CategorySelectOption[] = [];

  private _value: ProductCategoryDto[];
  get value(): ProductCategoryDto[] {

    const selected = [];
    const populate = (options: CategorySelectOption[]) => {
      options.forEach(option => {
        if (option.isSelected) {
          const savedValue = this._value.find(category => category.id === option.id);
          selected.push(savedValue ? savedValue : { id: option.id, name: option.name, slug: option.slug });
        }
        populate(option.children);
      });
    };

    populate(this.options);
    return selected;
  }
  set value(categories: ProductCategoryDto[]) {
    this._value = categories;
    this.setOptionsSelectedState(this.options);
    this.onChange(categories);
    this.onTouched();
  }

  constructor(private http: HttpClient,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    setTimeout(() => this.init());
  }

  private init() {
    this.http.get<ResponseDto<CategoryTreeItem[]>>(`${API_HOST}/api/v1/admin/categories/tree`).subscribe(
      response => {
        this.options = this.buildOptions(response.data);
        this.cdr.markForCheck();
      },
      error => console.warn(error)
    );
  }

  onChange = (_: any) => {};

  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: ProductCategoryDto[]): void {
    if (value === null) {
      value = [];
    }

    if (!Array.isArray(value)) {
      throw new Error(`Value for ${CategorySelectComponent.name} must be an array`);
    }

    this.value = value;
    this.setOptionsSelectedState(this.options);
  }

  toggleOption(option: CategorySelectOption, isSelected = !option.isSelected) {
    option.isSelected = isSelected;
    this.onChange(this.value);
    this.onTouched();
  }

  unselectOption(event: Event, category: ProductCategoryDto) {
    event.stopPropagation();
    const option = this.findOptionById(category.id);
    this.toggleOption(option, false);
  }

  toggleVisibility(isVisible = !this.isVisible) {
    this.isVisible = isVisible;
  }

  private buildOptions(categories: CategoryTreeItem[]): CategorySelectOption[] {
    return categories.map(({ id, name, slug, children }) => {
      const isSelected = !!this._value.find(category => category.id === id);
      return {
        id,
        name,
        slug,
        children: this.buildOptions(children),
        isSelected
      }
    });
  }

  private setOptionsSelectedState(options: CategorySelectOption[]): void {
    options.forEach(option => {
      option.isSelected = !!this._value.find(category => category.id === option.id);
      this.setOptionsSelectedState(option.children);
    });
  }

  private findOptionById(id: number): CategorySelectOption {
    const findOption = (options) => {
      for (const option of options) {
        if (option.id === id) {
          return option;
        }
        if (option.children?.length) {
          return findOption(option.children);
        }
      }
    }

    return findOption(this.options);
  }
}
