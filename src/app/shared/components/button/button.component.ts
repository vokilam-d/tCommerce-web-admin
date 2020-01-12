import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() btnStyle: 'default' | 'primary' = 'default';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled: boolean = false;
  @Input() btnSize: 'default' | 'small' = 'default';

  @HostBinding('style.pointer-events') get event() { return this.disabled ? 'none' : 'auto' }

  constructor() { }

  ngOnInit() {
  }

}
