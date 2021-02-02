import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotyService } from '../../../noty/noty.service';
import { OrderDto } from '../../../shared/dtos/order.dto';
import { InvoiceEditDto } from '../../../shared/dtos/invoice-edit.dto';
import { ShipmentTypeEnum } from '../../../shared/enums/shipment-type.enum';
import { NgUnsubscribe } from '../../../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';

@Component({
  selector: 'invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.scss']
})
export class InvoiceModalComponent extends NgUnsubscribe implements OnInit {

  isModalVisible: boolean = false;
  form: FormGroup;
  activeTitleIndex: number = 0;
  titles: string[] = ['Видаткова накладна', 'Рахунок-фактура'];

  @Input() order: OrderDto;
  @Output('print') printEmitter = new EventEmitter<InvoiceEditDto>();

  get isWarehouseShipment(): boolean {
    return this.order.shipment.shipmentType === ShipmentTypeEnum.WAREHOUSE_DOORS;
  }

  constructor(
    private notyService: NotyService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    const controls: Partial<Record<keyof InvoiceEditDto, any>> = {
      title: this.titles[0],
      address: this.order.shipment.recipient.addressFull || this.order.shipment.recipient.address,
      addressCity: this.order.shipment.recipient.settlementFull || this.order.shipment.recipient.settlement,
      addressName: `${this.order.shipment.recipient.firstName} ${this.order.shipment.recipient.lastName}`,
      addressPhone: this.order.shipment.recipient.phone,
      hideStamp: false,
      withoutDiscounts: false
    };

    if (this.isWarehouseShipment) {
      controls.addressBuildingNumber = this.order.shipment.recipient.buildingNumber;
      controls.addressFlatNumber = this.order.shipment.recipient.flat;
    }

    this.form = this.formBuilder.group(controls);
    this.form.get('title').valueChanges
      .pipe( this.takeUntilDestroy() )
      .subscribe((title: string) => {
        if (!this.titles.includes(title)) {
          this.activeTitleIndex = null;
        }
      });
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  onFormSubmit() {
    if (this.form.invalid) {
      this.notyService.showErrorNoty(`Ошибка в форме`);
      return;
    }

    this.printEmitter.emit(this.form.value);
    this.closeModal();
  }

  selectTitle(index: number) {
    this.activeTitleIndex = index;
    this.form.get('title').setValue(this.titles[this.activeTitleIndex]);
  }
}
