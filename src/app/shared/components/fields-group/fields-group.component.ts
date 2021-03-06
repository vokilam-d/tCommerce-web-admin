import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';

const animateTiming = '0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
const hiddenStyles = { 'height': 0, 'overflow': 'hidden', 'padding': 0 };
const visibleStyles = { 'height': '*', 'padding': '*' };

@Component({
  selector: 'fields-group',
  templateUrl: './fields-group.component.html',
  styleUrls: ['./fields-group.component.scss'],
  animations: [
    trigger('blockInitialAnimation', [transition(':enter', [])]),
    trigger('slideToggle', [
      state('true', style(visibleStyles)),
      state('false', style(hiddenStyles)),
      transition('* => true', animate(animateTiming, style(visibleStyles))),
      transition('* => false', animate(animateTiming, style(hiddenStyles)))
    ])
  ]
})
export class FieldsGroupComponent implements OnInit {

  isOpened: boolean;

  @Input() id: string = 'default';
  @Input() showHeader: boolean = true;

  get storageKey(): string { return `fields_group_${this.id}`; }

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit() {
    this.setInitialState();
  }

  toggle() {
    this.isOpened = !this.isOpened;
    this.saveState();
  }

  private setInitialState() {
    if (this.showHeader === false) {
      this.isOpened = true;
      return;
    }

    if (this.id === 'default') {
      this.isOpened = false;
      return;
    }

    if (!isPlatformBrowser(this.platformId)) {
      this.isOpened = false;
      return;
    }

    this.isOpened = JSON.parse(localStorage.getItem(this.storageKey)) || false;
  }

  private saveState() {
    if (this.id === 'default') {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.isOpened));
  }
}
