import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { ProductListItemDto, ProductVariantListItemDto } from '../shared/dtos/product.dto';
import { DEFAULT_CURRENCY_CODE } from '../shared/enums/currency.enum';
import { Subscription } from 'rxjs';
import { IGridCell, IGridValue } from '../grid/grid.interface';
import { GridComponent } from '../grid/grid.component';
import { NotyService } from '../noty/noty.service';
import { finalize } from 'rxjs/operators';
import { getPropertyOf } from '../shared/helpers/get-property-of.function';
import { API_HOST } from '../shared/constants/constants';

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
  styleUrls: ['./product-selector.component.scss']
})
export class ProductSelectorComponent implements OnInit, AfterViewInit {

  uploadedHost = API_HOST;
  private fetchAllSub: Subscription;
  isSelectorVisible: boolean = false;
  products: ProductForSelector[] = [];
  itemsTotal: number = 0;
  itemsFiltered: number;
  pagesTotal: number = 1;
  isGridLoading: boolean = false;
  gridCells: IGridCell[] = productGridCells;
  variantsFieldName = getPropertyOf<ProductForSelector>('variants');
  defaultCurrency = DEFAULT_CURRENCY_CODE;

  @Input() showQty: boolean = false;
  @Output('selected') selectedEmitter: EventEmitter<ISelectedProduct> = new EventEmitter();
  @ViewChild(GridComponent) gridCmp: GridComponent;

  constructor(private productService: ProductService,
              private cdr: ChangeDetectorRef,
              private notyService: NotyService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const gridValue = this.gridCmp.getValue();
    this.fetchProducts(gridValue);
  }

  showSelector() {
    this.isSelectorVisible = true;
  }

  hideSelector() {
    this.isSelectorVisible = false;
  }

  fetchProducts(gridValue: IGridValue) {
    if (this.fetchAllSub) { this.fetchAllSub.unsubscribe(); }

    this.isGridLoading = true;
    this.cdr.detectChanges();
    this.fetchAllSub = this.productService.fetchAllProducts(gridValue, true)
      .pipe(this.notyService.attachNoty(), finalize(() => this.isGridLoading = false))
      .subscribe(
        response => {
          this.products = this.transformProducts(response.data);
          this.itemsTotal = response.itemsTotal;
          this.itemsFiltered = response.itemsFiltered;
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

  isBtnDisabled(variant: VariantForSelector): boolean {
    return this.showQty && variant.selectedQty === 0;
  }
}

const productGridCells: IGridCell[] = [
  {
    isSearchable: false,
    label: 'ID',
    initialWidth: 30,
    align: 'center',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<ProductForSelector>('id')
  },
  {
    isSearchable: false,
    label: 'Фото',
    initialWidth: 60,
    align: 'left',
    isImage: true,
    isSortable: false,
    fieldName: getPropertyOf<ProductForSelector>('mediaUrl')
  },
  {
    isSearchable: true,
    label: 'Название товара',
    initialWidth: 250,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<ProductForSelector>('name')
  },
  {
    isSearchable: true,
    label: 'Артикул',
    initialWidth: 50,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: `${getPropertyOf<ProductForSelector>('variants')}.${getPropertyOf<VariantForSelector>('sku')}`
  },
  {
    isSearchable: true,
    label: 'Цена',
    initialWidth: 60,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: `${getPropertyOf<ProductForSelector>('variants')}.${getPropertyOf<VariantForSelector>('price')}`
  },
  {
    isSearchable: true,
    label: 'Кол-во',
    initialWidth: 110,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: `${getPropertyOf<ProductForSelector>('variants')}.${getPropertyOf<VariantForSelector>('qty')}`
  },
  {
    isSearchable: false,
    label: 'Статус',
    initialWidth: 70,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<ProductForSelector>('isEnabled')
  },
  {
    isSearchable: false,
    label: '',
    initialWidth: 100,
    align: 'left',
    isImage: false,
    isSortable: false,
    fieldName: ''
  }
];
