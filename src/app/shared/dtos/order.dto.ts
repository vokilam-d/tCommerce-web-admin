import { OrderItemDto } from './order-item.dto';
import { ShipmentDto } from './shipment.dto';
import { OrderStatusEnum } from '../enums/order-status.enum';
import { PaymentMethodEnum } from '../enums/payment-method.enum';
import { OrderPricesDto } from './order-prices.dto';

export class AddOrUpdateOrderDto {
  customerId: number;
  customerFirstName: string = '';
  customerLastName: string = '';
  customerEmail: string = '';
  customerPhoneNumber: string = '';
  customerNote: string = '';
  shipment: ShipmentDto = new ShipmentDto();
  shouldSaveAddress: boolean = true;
  createdAt: Date;
  isConfirmationEmailSent: boolean = false;
  paymentType: PaymentMethodEnum;
  paymentMethodId: string;
  paymentMethodAdminName: string;
  paymentMethodClientName: string;
  shippingMethodName: string;
  isCallbackNeeded: boolean = false;
  items: OrderItemDto[] = [];
  status: OrderStatusEnum = OrderStatusEnum.NEW;
  clientNote: string = '';
  adminNote: string = '';
  notes: string[] = [];
  prices: OrderPricesDto = new OrderPricesDto();
  isOrderPaid: boolean = false;
}

export class OrderDto extends AddOrUpdateOrderDto {
  id: number;
  statusDescription: string;
  source: 'client' | 'manager';
}

export class UpdateOrderAdminNote {
  adminNote: string;
}
