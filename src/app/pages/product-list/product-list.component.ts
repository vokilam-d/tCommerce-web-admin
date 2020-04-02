import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductListItemDto } from '../../shared/dtos/product.dto';
import { NotyService } from '../../noty/noty.service';
import { saveFileFromUrl } from '../../shared/helpers/save-file.function';
import { IGridCell, IGridValue } from '../../grid/grid.interface';
import { GridComponent } from '../../grid/grid.component';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { getPropertyOf } from '../../shared/helpers/get-property-of.function';
import { API_HOST } from '../../shared/constants/constants';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  uploadedHost = API_HOST;
  private fetchAllSub: Subscription;
  products: ProductListItemDto[];

  itemsTotal: number = 0;
  itemsFiltered: number;
  pagesTotal: number = 1;
  gridLinkUrl: string = 'edit';
  isGridLoading: boolean = false;
  gridCells: IGridCell[] = productGridCells;
  @ViewChild(GridComponent) gridCmp: GridComponent;

  constructor(private productsService: ProductService,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private notyService: NotyService,
              private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const gridValue = this.gridCmp.getValue();
    this.fetchProducts(gridValue);
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  fetchProducts(gridValue: IGridValue) {
    if (this.fetchAllSub) { this.fetchAllSub.unsubscribe(); }

    this.isGridLoading = true;
    this.cdr.detectChanges();
    this.fetchAllSub = this.productsService.fetchAllProducts(gridValue, false)
      .pipe(this.notyService.attachNoty(), finalize(() => this.isGridLoading = false))
      .subscribe(
        response => {
          this.products = response.data;
          this.itemsTotal = response.itemsTotal;
          this.itemsFiltered = response.itemsFiltered;
          this.pagesTotal = response.pagesTotal;
        },
        error => console.warn(error)
      );
  }

  downloadShoppingFeed() {
    const url = this.productsService.getGoogleShoppingFeedUrl();
    saveFileFromUrl(url);
  }

  downloadReviewsFeed() {
    const url = this.productsService.getGoogleReviewsFeedUrl();
    saveFileFromUrl(url);
  }

  onGridChange(evt: IGridValue) {
    this.fetchProducts(evt);
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
    fieldName: getPropertyOf<ProductListItemDto>('id')
  },
  {
    isSearchable: false,
    label: 'Фото',
    initialWidth: 60,
    align: 'center',
    isImage: true,
    isSortable: false,
    fieldName: getPropertyOf<ProductListItemDto>('mediaUrl')
  },
  {
    isSearchable: true,
    label: 'Название товара',
    initialWidth: 500,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<ProductListItemDto>('name')
  },
  {
    isSearchable: true,
    label: 'Артикул',
    initialWidth: 70,
    align: 'left',
    isImage: false,
    isSortable: false,
    fieldName: getPropertyOf<ProductListItemDto>('skus')
  },
  {
    isSearchable: false,
    label: 'Цена',
    initialWidth: 70,
    align: 'left',
    isImage: false,
    isSortable: false,
    fieldName: getPropertyOf<ProductListItemDto>('prices')
  },
  {
    isSearchable: false,
    label: 'Кол-во',
    initialWidth: 55,
    align: 'left',
    isImage: false,
    isSortable: false,
    fieldName: getPropertyOf<ProductListItemDto>('quantities')
  },
  {
    isSearchable: false,
    label: 'Статус',
    initialWidth: 70,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<ProductListItemDto>('isEnabled')
  }
];
