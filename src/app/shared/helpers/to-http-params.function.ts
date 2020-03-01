import { HttpParams } from '@angular/common/http';
import { IGridValue, IGridFilter } from '../../grid/grid.interface';

export function toHttpParams(obj: IGridValue | { [key: string]: any }): HttpParams {
  let params = new HttpParams();

  Object.keys(obj).forEach(key => {
    let value = obj[key];
    if (value === undefined) { return; }

    if (key === 'filters') {
      value = (value as IGridFilter[])
        .filter(f => f.value)
        .map(f => `${f.fieldName}:${f.value}`);
    }

    if (Array.isArray(value)) {
      value = value.join(',');
    }

    params = params.set(key, encodeURIComponent(value.toString()));
  });

  return params;
}
