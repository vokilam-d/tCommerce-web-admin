import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { NotyService } from '../../../noty/noty.service';
import { finalize } from 'rxjs/operators';
import { ProductListItemDto } from '../../../shared/dtos/product.dto';
import { API_HOST } from '../../../shared/constants/constants';
import { IDraggedEvent } from '../../../shared/directives/draggable-item/draggable-item.directive';

@Component({
  selector: 'product-item-sorter',
  templateUrl: './product-item-sorter.component.html',
  styleUrls: ['./product-item-sorter.component.scss']
})
export class ProductItemSorterComponent implements OnInit {

  isModalVisible: boolean = false;
  isLoading: boolean = false;
  products: ProductListItemDto[];
  uploadedHost = API_HOST;

  @Input() categoryId: number;

  constructor(private productService: ProductService,
              private notyService: NotyService) {
  }

  ngOnInit(): void {
  }

  openModal() {
    this.isModalVisible = true;
    this.fetchProducts();
  }

  closeModal() {
    this.isModalVisible = false;
    this.products = [];
  }

  private fetchProducts() {
    this.isLoading = true;
    this.productService.fetchAllProducts(this.getFetchProductsParams(), false)
      .pipe(this.notyService.attachNoty(), finalize(() => this.isLoading = false))
      .subscribe(response => {
        this.products = response.data;
      });
  }

  onReorder(draggedEvt: IDraggedEvent) {
    this.isLoading = true;

    this.productService.reorderProduct(
      draggedEvt.item,
      draggedEvt.targetItem,
      draggedEvt.position,
      this.categoryId,
      this.getFetchProductsParams()
    )
      .pipe(this.notyService.attachNoty(), finalize(() => this.isLoading = false))
      .subscribe(
        response => {
          this.products = response.data;
        },
        error => console.warn(error)
      );
  }

  private getFetchProductsParams() {
    return {
      filters: [{ fieldName: 'categories.id', value: `${this.categoryId}` }],
      sort: '-categories.sortOrder',
      limit: 1000,
      page: 1
    };
  }

  getSortOrder(product: ProductListItemDto): number {
    const foundCategory = product.categories.find(c => c.id === this.categoryId);
    return foundCategory.sortOrder;
  }
}
