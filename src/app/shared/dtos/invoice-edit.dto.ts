export class InvoiceEditDto {
  title: string;
  addressName: string;
  addressPhone: string;
  addressCity: string;
  address: string;
  addressBuildingNumber?: string;
  addressFlatNumber?: string;
  hideStamp: boolean;
  withoutDiscounts: boolean;
}
