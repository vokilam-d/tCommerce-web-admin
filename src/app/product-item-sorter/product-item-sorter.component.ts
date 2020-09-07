import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductItemWithSortOrder } from './product-item-with-sort-order';
import { IDraggedEvent } from '../shared/directives/draggable-item/draggable-item.directive';
import { UPLOADED_HOST } from '../shared/constants/constants';
import { ProductListItemDto } from '../shared/dtos/product.dto';

@Component({
  selector: 'product-item-sorter',
  templateUrl: './product-item-sorter.component.html',
  styleUrls: ['./product-item-sorter.component.scss']
})
export class ProductItemSorterComponent implements OnInit {

  uploadedHost = UPLOADED_HOST;

  @Input() isLoading: boolean = false;
  @Input() items: ProductItemWithSortOrder[];
  @Input() itemsType = 'product';
  @Input() hasRemoveBtn: boolean = false;
  @Output() reorder = new EventEmitter<IDraggedEvent<ProductItemWithSortOrder>>();
  @Output() remove = new EventEmitter<ProductItemWithSortOrder>();

  constructor() { }

  ngOnInit(): void {
  }

  onReorder(event: IDraggedEvent) {
    this.reorder.emit(event);
  }

  onRemove(item: ProductItemWithSortOrder) {
    if (!confirm(`Вы точно хотите убрать товар с id "${item.id}" из этого списка?`)) { return; }

    this.remove.emit(item);
  }

  setItemThumbnail(product: ProductListItemDto) {
    if (!product.mediaUrl) {
      return 'admin/assets/images/no-img.png';
    } else {
      return this.uploadedHost + product.mediaUrl;
    }
  }
}
