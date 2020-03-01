import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IPagination } from '../pagination/pagination.interface';
import { PaginationComponent } from '../pagination/pagination.component';
import { ProductService } from '../shared/services/product.service';
import { ProductListItemDto, ProductVariantListItemDto } from '../shared/dtos/product.dto';
import { DEFAULT_CURRENCY_CODE } from '../shared/enums/currency.enum';

class VariantForSelector extends ProductVariantListItemDto {
  selectedQty: number;
}

class ProductForSelector extends ProductListItemDto {
  variants: VariantForSelector[];
  isOpened: boolean;
  isSingleVariant: boolean;
}

interface ISelectedProduct {
  product: ProductListItemDto;
  variant: ProductVariantListItemDto;
  qty: number;
}

@Component({
  selector: 'product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.scss'],
  animations: [
    trigger('slideToggle', [
      state('true', style({ 'height': '*', 'padding': '*' })),
      state('false', style({ 'height': 0, 'overflow': 'hidden', 'padding': 0, 'margin': 0, 'border-color': 'transparent' })),
      transition('* <=> *', animate('0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'))
    ])
  ]
})
export class ProductSelectorComponent implements OnInit, AfterViewInit {

  isSelectorVisible: boolean = false;
  products: ProductForSelector[] = [];
  itemsTotal: number = 0;
  pagesTotal: number = 1;
  defaultCurrency = DEFAULT_CURRENCY_CODE;

  @Input() showQty: boolean = false;
  @Output('selected') selectedEmitter: EventEmitter<ISelectedProduct> = new EventEmitter();

  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const pagination = this.paginationCmp.getValue();
    this.fetchProducts(pagination);
  }

  showSelector() {
    this.isSelectorVisible = true;
  }

  hideSelector() {
    this.isSelectorVisible = false;
  }

  fetchProducts(pagination: IPagination) {
    this.productService.fetchAllProducts(pagination, true)
      .subscribe(
        response => {
          this.products = this.transformProducts(response.data);
          this.itemsTotal = response.itemsTotal;
          this.pagesTotal = response.pagesTotal;
        }
      );
  }

  private transformProducts(products: ProductListItemDto[]): ProductForSelector[] {
    return products.map(product => {
      const variants = product.variants.map(variant => {
        return {
          ...variant,
          selectedQty: 0
        }
      });

      return {
        ...product,
        variants,
        isOpened: false,
        isSingleVariant: product.variants.length === 1
      };
    })
  }

  selectProduct(product: ProductForSelector, variant: VariantForSelector) {
    this.selectedEmitter.emit({ product, variant, qty: variant.selectedQty });
    variant.selectedQty = 0;
  }

  trackById(index: number, product: ProductForSelector) {
    return product.id;
  }

  isBtnDisabled(variant: VariantForSelector): boolean {
    return this.showQty && variant.selectedQty === 0;
  }
}
