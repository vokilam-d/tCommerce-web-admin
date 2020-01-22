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
  paymentMethodAdminName: string;
  paymentMethodClientName: string;
  shippingMethodId: string;
  shippingMethodAdminName: string;
  shippingMethodClientName: string;
  isCallbackNeeded: boolean = false;
  novaposhtaTrackingId: any;
  items: OrderItemDto[] = [];
  status: any = '';
  clientNote: string = '';
  adminNote: string = '';
  notes: string[] = [];
  orderTotalPrice: number = 0;
}

export class OrderDto extends AddOrUpdateOrderDto {
  id: number;
}
