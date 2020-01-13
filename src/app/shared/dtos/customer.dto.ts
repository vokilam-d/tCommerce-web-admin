import { ShippingAddressDto } from './shipping-address.dto';

export class AddOrUpdateCustomerDto {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: any = undefined;
  createdDate: Date = undefined;
  lastLoggedIn: Date = undefined;
  isLocked: boolean = undefined;
  isEmailConfirmed: boolean = undefined;
  isPhoneNumberConfirmed: boolean = undefined;
  note: string = '';
  addresses: ShippingAddressDto[] = [];
  reviewIds: number[] = [];
  orderIds: number[] = [];
  wishlistProductIds: number[] = [];
  discountPercent: number = 0;
  totalOrdersCost: number = 0;
}

export class CustomerDto extends AddOrUpdateCustomerDto {
  id: number;
}
