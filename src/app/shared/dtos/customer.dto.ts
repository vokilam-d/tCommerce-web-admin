import { CustomerAddressDto } from './customer-address.dto';

export class AddOrUpdateCustomerDto {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: any;
  creationDate: Date;
  lastLoggedIn: Date;
  isLocked: boolean;
  isEmailConfirmed: boolean;
  isPhoneNumberConfirmed: boolean;
  note: string = '';
  addresses: CustomerAddressDto[] = [];
  reviewIds: number[] = [];
  orderIds: number[] = [];
  wishlistProductIds: number[] = [];
}

export class CustomerDto extends AddOrUpdateCustomerDto {
  id: number;
}
