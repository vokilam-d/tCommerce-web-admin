import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DraggableService {

  private draggingItem: { type: string, item: any } = null;

  constructor() { }

  setDraggingItem(type: string, item: any) {
    this.draggingItem = { type, item };
  }

  getDraggingItem(type: string): any {
    if (!this.draggingItem || this.draggingItem.type !== type) { return; }

    return this.draggingItem.item;
  }

  removeDraggingItem() {
    this.draggingItem = null;
  }
}
