import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-list-viewer-modal',
  templateUrl: './order-list-viewer-modal.component.html',
  styleUrls: ['./order-list-viewer-modal.component.scss']
})
export class OrderListViewerModalComponent implements OnInit {

  sku: string;
  orderIds: number[];
  isModalVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openModal(sku: string, orderIds: number[]) {
    this.sku = sku;
    this.orderIds = orderIds;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.sku = null;
    this.orderIds = null;
  }
}
