export class PaymentMethodDto {
  id?: string;
  isEnabled: boolean = true;
  name: string = '';
  price: number = 0;
  sortOrder: number = 0;
}
