import { Pipe, PipeTransform } from '@angular/core';
import { ECurrencyCode } from '../enums/currency.enum';

@Pipe({
  name: 'readableCurrency'
})
export class ReadableCurrencyPipe implements PipeTransform {
  private eurRegex = new RegExp(ECurrencyCode.EUR, 'g');
  private uahRegex = new RegExp(ECurrencyCode.UAH, 'g');
  private usdRegex = new RegExp(ECurrencyCode.USD, 'g');

  transform(value: string = ''): string {
    return value
      .replace(this.eurRegex, '€')
      .replace(this.uahRegex, 'грн')
      .replace(this.usdRegex, '$');
  }

}
