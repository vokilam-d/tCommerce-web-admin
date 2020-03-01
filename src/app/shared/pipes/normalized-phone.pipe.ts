import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalizedPhone'
})
export class NormalizedPhonePipe implements PipeTransform {

  transform(phone: any = '', ...args: any[]): any {
    phone = phone.toString();
    phone = phone.replace(/[( )\-_+]/g, '');

    if (phone.length === 10 && phone.indexOf('0') === 0) {
      phone = '38' + phone;
    } else if (phone.length === 11 && phone.indexOf('80') === 0) {
      phone = '3' + phone;
    }

    return phone;
  }

}
