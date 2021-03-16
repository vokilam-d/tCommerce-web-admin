import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beautifyPhone'
})
export class BeautifyPhonePipe implements PipeTransform {

  private static regex = /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/;

  transform(phone: string = '', ...args: any[]): string {
    const match = phone.match(BeautifyPhonePipe.regex);
    if (match === null) { return phone; }

    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }

}
