import { AddressTypeEnum } from '../enums/address-type.enum';

export class ShipmentAddressDto {
  isDefault: boolean = false;
  id?: number;
  settlement: string = '';
  settlementId: string = '';
  addressType: AddressTypeEnum = AddressTypeEnum.WAREHOUSE;
  addressId?: string = '';
  address?: string = '';
  warehouseId?: string = '';
  warehouse?: string = '';
  phone?: string = '';
  firstName?: string = '';
  lastName?: string = '';
  middleName?: string = '';
  buildingNumber?: string = '';
  flat?: string = '';
  note?: string = '';
}
