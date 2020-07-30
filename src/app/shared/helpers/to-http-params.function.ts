import { HttpParams } from '@angular/common/http';
import { IGridValue, IGridFilter } from '../../grid/grid.interface';

export function toHttpParams(obj: IGridValue | { [key: string]: any }): HttpParams {
  let params = new HttpParams();

  Object.keys(obj).forEach(key => {
    let value = obj[key];
    if (value === undefined || value === null) { return; }

    if (key === 'filters') {
      value = (value as IGridFilter[])
        .filter(filter => {
          return Array.isArray(filter.value) ? filter.value.length : filter.value;
        })
        .map(filter => {
          const filterValue = Array.isArray(filter.value) ? filter.value.join('|') : filter.value;

          return `${filter.fieldName}:${filterValue}`;
        });
    }

    if (Array.isArray(value)) {
      value = value
        .map(v => v.toString().replace(/,/g, ''))
        .join(',');
    } else {
      value = value.toString().replace(/,/g, '');
    }

    params = params.set(key, encodeURIComponent(value));
  });

  return params;
}
