import { AfterContentInit, ContentChildren, Directive, ElementRef, Input, QueryList } from '@angular/core';
import { DraggableItemDirective } from '../draggable-item/draggable-item.directive';

@Directive({
  selector: '[draggable-list]'
})
export class DraggableListDirective implements AfterContentInit {

  @Input('draggable-list') d;
  @ContentChildren(DraggableItemDirective) items: QueryList<DraggableItemDirective>;

  draggingElement: any = null;

  constructor() { }

  ngAfterContentInit() {
    console.log('after content init list');
    console.log(this.items);
    this.items.changes.subscribe(console.log);
  }

  dragStart(item: DraggableItemDirective) {
    this.draggingElement = item;
    item.isDragging = true;
  }

  dragEnd(item: DraggableItemDirective) {
    this.items.forEach(item => {
      console.log(item);
      item.isDragging = false;
    });
    console.log(this.items.map(item => item.isDragging));
    this.draggingElement = null;
  }

  drag(item: DraggableItemDirective) {
    if (this.draggingElement) {
      console.log(item);
    }
  }
}
