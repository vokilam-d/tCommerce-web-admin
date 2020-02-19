import { ECurrencyCode } from '../enums/currency.enum';

export class CurrencyDto {
  id: ECurrencyCode;
  label: string;
  exchangeRate: number;
  isDefault: boolean;
  updatedAt: Date;
}
