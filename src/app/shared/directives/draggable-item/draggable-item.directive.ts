import { AfterViewInit, Directive, ElementRef, Host, Input, Optional } from '@angular/core';
import { DraggableListDirective } from '../draggable-list/draggable-list.directive';

@Directive({
  selector: '[draggable-item]'
})
export class DraggableItemDirective implements AfterViewInit {

  @Input('draggable-item') d;

  constructor(@Optional() @Host() private list: DraggableListDirective,
              private elementRef: ElementRef) { }

  ngAfterViewInit () {
    console.log('after view init item');
    // console.log(this.elementRef);
    // console.log(this.list.items.push(this.elementRef));
  }
}
