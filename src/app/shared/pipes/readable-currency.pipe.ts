import { Pipe, PipeTransform } from '@angular/core';
import { ECurrencyCode } from '../enums/currency.enum';

@Pipe({
  name: 'readableCurrency'
})
export class ReadableCurrencyPipe implements PipeTransform {

  transform(value: ECurrencyCode): string {
    switch (value) {
      case ECurrencyCode.EUR:
        return '€';
      case ECurrencyCode.UAH:
        return 'грн';
      case ECurrencyCode.USD:
        return '$';
    }
  }

}
