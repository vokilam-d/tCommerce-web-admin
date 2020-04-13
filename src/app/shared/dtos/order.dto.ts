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
  createdAt: Date;
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
  discountPercent: number = 0;
  discountValue: number = 0;
  totalItemsCost: number = 0;
  totalCost: number = 0;
}

export class OrderDto extends AddOrUpdateOrderDto {
  id: number;
}

export class TrackingIdDto {
  trackingId: string;
}
