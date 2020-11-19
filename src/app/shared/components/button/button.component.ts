import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() btnStyle: 'default' | 'primary' | 'danger' = 'default';
  @Input() type: 'button' | 'submit' | 'link' | 'external-link' = 'button';
  @Input() disabled: boolean = false;
  @Input() btnSize: 'default' | 'small' | 'big' = 'default';
  @Input() link?: string[] | string = null;

  @HostBinding('style.pointer-events') get event() { return this.disabled ? 'none' : 'auto' }

  get ngClass(): string[] {
    return ['btn--color-' + this.btnStyle, 'btn--size-' + this.btnSize]
  }

  constructor() { }

  ngOnInit() {
  }

}
