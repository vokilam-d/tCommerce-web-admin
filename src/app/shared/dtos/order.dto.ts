import { ShippingAddressDto } from './shipping-address.dto';
import { OrderItemDto } from './order-item.dto';

export class AddOrUpdateOrderDto {
  customerId: number;
  customerFirstName: string = '';
  customerLastName: string = '';
  customerEmail: string = '';
  customerPhoneNumber: string = '';
  address: ShippingAddressDto = new ShippingAddressDto();
  shouldSaveAddress: boolean = false;
  createdDate: Date;
  isConfirmationEmailSent: boolean = false;
  paymentMethodId: string;
  paymentMethodName: string;
  shippingMethodId: string;
  shippingMethodName: string;
  isCallbackNeeded: boolean = false;
  novaposhtaTrackingId: any;
  items: OrderItemDto[] = [];
  status: any = '';
  clientNote: string = '';
  adminNote: string = '';
  notes: string[] = [];
  orderTotalPrice: number = 0;
  invoiceIds: number[] = [];
  shipmentIds: number[] = [];
}

export class OrderDto extends AddOrUpdateOrderDto {
  id: number;
}
