import { Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';


@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() labels: string[];
  activeLabelIdx: number = 0;

  @ContentChildren('tabContent') tabContents: QueryList<TemplateRef<any>>;
  get tabContentsArray(): TemplateRef<any>[] { return this.tabContents.toArray(); }

  constructor() { }

  ngOnInit() {
    if (!this.labels) { throw new Error(`Input property 'labels' is mandatory`); }

  }
}
