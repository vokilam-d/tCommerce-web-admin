import { ElementRef, Injectable } from '@angular/core';
import { DraggableItemDirective } from '../directives/draggable-item/draggable-item.directive';

type DragItem = {
  id: string;
  elementRef: ElementRef
};

@Injectable({
  providedIn: 'root'
})
export class DraggableService {

  private draggingItem: { type: string, item: any } = null;
  // items: { [type: string]: DraggableItemDirective[]; } = { };

  constructor() { }

  // registerItem(type: string, item: DraggableItemDirective) {
  //   this.items[type] = this.items[type] || [];
  //   this.items[type].push(item);
  // }
  //
  // unregisterItem(type: string, item: DraggableItemDirective) {
  //   const foundIdx = this.items[type].findIndex(registered => registered.id === item.id);
  //   if (foundIdx === -1) { return; }
  //
  //   this.items[type].splice(foundIdx, 1);
  // }

  isDragInProgress(): boolean {
    return !!this.draggingItem;
  }

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
