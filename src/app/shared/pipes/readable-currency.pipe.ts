import { Pipe, PipeTransform } from '@angular/core';
import { ECurrencyCode } from '../enums/currency.enum';

@Pipe({
  name: 'readableCurrency'
})
export class ReadableCurrencyPipe implements PipeTransform {

  transform(value: string = ''): string {
    return value
      .replace(ECurrencyCode.EUR, '€')
      .replace(ECurrencyCode.UAH, 'грн')
      .replace(ECurrencyCode.USD, '$');
  }

}
