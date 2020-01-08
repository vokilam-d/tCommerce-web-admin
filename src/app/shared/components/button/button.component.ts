import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() btnStyle: 'default' | 'primary' = 'default';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
