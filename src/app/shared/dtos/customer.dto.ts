import { ShipmentAddressDto } from './shipment-address.dto';

export class AddOrUpdateCustomerDto {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: any = undefined;
  createdAt: Date = undefined;
  lastLoggedIn: Date = undefined;
  isLocked: boolean = undefined;
  isEmailConfirmed: boolean = undefined;
  isPhoneNumberConfirmed: boolean = undefined;
  note: string = '';
  addresses: ShipmentAddressDto[] = [];
  deprecatedAddresses: string[];
  reviewIds: number[] = [];
  orderIds: number[] = [];
  wishlistProductIds: number[] = [];
  discountPercent: number = 0;
  totalOrdersCost: number = 0;
}

export class CustomerDto extends AddOrUpdateCustomerDto {
  id: number;
}
