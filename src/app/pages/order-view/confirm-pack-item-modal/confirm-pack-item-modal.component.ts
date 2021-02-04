import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotyService } from '../../../noty/noty.service';
import { OrderDto } from '../../../shared/dtos/order.dto';
import { NgUnsubscribe } from '../../../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'confirm-pack-item-modal',
  templateUrl: './confirm-pack-item-modal.component.html',
  styleUrls: ['./confirm-pack-item-modal.component.scss']
})
export class ConfirmPackItemModalComponent extends NgUnsubscribe implements OnInit {

  isModalVisible: boolean = false;
  itemName: string = '';
  form: FormGroup;
  private result$ = new Subject<number | null>();

  @Input() order: OrderDto;

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({ qty: null });
  }

  openModal(itemName: string): Observable<number | null> {
    this.itemName = itemName;
    this.isModalVisible = true;

    return this.result$.asObservable().pipe( take(1) );
  }

  closeModal(sendValueResult: boolean = false) {
    const result = sendValueResult ? this.form.get('qty').value : null;
    this.isModalVisible = false;
    this.form.get('qty').setValue(null);
    this.itemName = '';
    this.result$.next(result);
  }
}
