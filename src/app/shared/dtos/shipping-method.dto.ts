export class ShippingMethodDto {
  id?: string;
  isEnabled: boolean = true;
  clientName: string = '';
  adminName: string = '';
  price: number = 0;
  sortOrder: number = 0;
}
