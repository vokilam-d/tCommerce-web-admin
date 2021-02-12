import { Component, OnInit } from '@angular/core';
import { NotyService } from './noty.service';
import { INoty } from './noty.interface';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'noty',
  templateUrl: './noty.component.html',
  styleUrls: ['./noty.component.scss']
})
export class NotyComponent extends NgUnsubscribe implements OnInit {

  noties: INoty[] = [];
  private counter: number = 0;
  private timeToAutoHide: number = 5000;
  private timeToErrorAutoHide: number = 15000;
  private autoHideTimeout: any;

  constructor(private notyService: NotyService) {
    super();
  }

  ngOnInit() {
    this.notyService.showNoty$
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(
        noty => {
          this.showNoty({
            id: this.counter++,
            isHiding: false,
            ...noty
          });
        }
      );
  }

  private showNoty(noty: INoty) {
    clearTimeout(this.autoHideTimeout);
    this.noties.push(noty);

    if (noty.autoHide) {
      const timeToAutoHide = noty.type === 'error' ? this.timeToErrorAutoHide : this.timeToAutoHide;
      setTimeout(() => this.hideNoty(noty), timeToAutoHide);
    }
    this.autoHideTimeout = setTimeout(() => this.removeAllNotiesExcept(noty), 300);
  }

  hideNoty(noty: INoty) {
    noty.isHiding = true;

    setTimeout(() => {
      const index = this.noties.findIndex(notyItem => notyItem.id === noty.id);
      if (index > -1) {
        this.noties.splice(index, 1);
      }
    }, 1000);
  }

  private removeAllNotiesExcept(notyArg: INoty) {
    this.noties = this.noties.filter(noty => noty.id === notyArg.id);
  }
}
