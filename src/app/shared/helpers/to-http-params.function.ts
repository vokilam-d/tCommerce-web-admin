import { HttpParams } from '@angular/common/http';

export function toHttpParams(obj: { [key: string]: any }): HttpParams {
  let params = new HttpParams();

  Object.keys(obj).forEach(key => {
    let value = obj[key];

    if (Array.isArray(value)) {
      value = value.join(',');
    } else if (value) {
      value = value.toString();
    }

    params = params.set(key, value);
  });

  return params;
}
