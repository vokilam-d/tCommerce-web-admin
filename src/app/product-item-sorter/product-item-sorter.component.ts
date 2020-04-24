import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductItemWithSortOrder } from './product-item-with-sort-order';
import { IDraggedEvent } from '../shared/directives/draggable-item/draggable-item.directive';
import { API_HOST } from '../shared/constants/constants';

@Component({
  selector: 'product-item-sorter',
  templateUrl: './product-item-sorter.component.html',
  styleUrls: ['./product-item-sorter.component.scss']
})
export class ProductItemSorterComponent implements OnInit {

  uploadedHost = API_HOST;

  @Input() isLoading: boolean = false;
  @Input() items: ProductItemWithSortOrder[];
  @Input() itemsType = 'product';
  @Output() reorder = new EventEmitter<IDraggedEvent<ProductItemWithSortOrder>>();

  constructor() { }

  ngOnInit(): void {
  }

  onReorder(event: IDraggedEvent) {
    this.reorder.emit(event);
  }
}
