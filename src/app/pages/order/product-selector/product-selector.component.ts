import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ProductDto } from '../../../shared/dtos/product.dto';
import { PaginationComponent } from '../../../pagination/pagination.component';
import { IPagination } from '../../../pagination/pagination.interface';
import { ProductVariantDto } from '../../../shared/dtos/product-variant.dto';
import { animate, state, style, transition, trigger } from '@angular/animations';

class VariantForSelector extends ProductVariantDto {
  selectedQty: number;
}

class ProductForSelector extends ProductDto {
  variants: VariantForSelector[];
  isOpened: boolean;
  isSingleVariant: boolean;
}

interface ISelectedProduct {
  variant: ProductVariantDto,
  qty: number
}

@Component({
  selector: 'product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;

  @Output('selected') selectedEmitter: EventEmitter<ISelectedProduct> = new EventEmitter();

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
    this.productService.fetchAllProducts(pagination)
      .subscribe(
        response => {
          this.products = this.transformProducts(response.data);
          this.itemsTotal = response.itemsTotal;
          this.pagesTotal = response.pagesTotal;
        }
      );
  }

  private transformProducts(products: ProductDto[]): ProductForSelector[] {
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

  selectProduct(variant: VariantForSelector) {
    this.selectedEmitter.emit({ variant, qty: variant.selectedQty });
    variant.selectedQty = 0;
  }
}
