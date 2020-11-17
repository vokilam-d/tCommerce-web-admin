import { OrderItemAdditionalServiceDto } from './order-item-additional-service.dto';

export class OrderItemDto {
  name: string = '';
  productId: number = 0;
  variantId: string = '';
  sku: string = '';
  vendorCode: string = '';
  price: number = 0;
  qty: number = 0;
  cost: number = 0;
  imageUrl: string = '';
  additionalServices: OrderItemAdditionalServiceDto[] = [];
}
