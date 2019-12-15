import { HttpParams } from '@angular/common/http';

export function toHttpParams(obj: { [key: string]: any }): HttpParams {
  let params = new HttpParams();

  Object.keys(obj).forEach(key => {
    params = params.set(key, `${obj[key]}`);
  });

  return params;
}
