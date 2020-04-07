import { AfterContentInit, ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { DraggableItemDirective } from '../draggable-item/draggable-item.directive';

@Directive({
  selector: '[draggable-list]'
})
export class DraggableListDirective implements AfterContentInit {

  @Input('draggable-list') d;
  @ContentChildren(DraggableItemDirective) myChildren: QueryList<DraggableItemDirective>;
  items: any[] = [];

  constructor() { }

  ngAfterContentInit() {
    console.log('after content init list');
    // console.log(this.myChildren.changes.subscribe(console.log));
  }
}
