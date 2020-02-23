import { HttpParams } from '@angular/common/http';
import { IGridValue, IGridFilter } from '../../grid/grid.interface';

export function toHttpParams(obj: IGridValue & { [key: string]: any }): HttpParams {
  let params = new HttpParams();

  Object.keys(obj).forEach(key => {
    let value = obj[key];
    if (!value) { return; }

    if (key === 'filters') {
      const filters = value as IGridFilter[];

      filters.forEach(filter => {
        params = params.set(`filters[${filter.fieldName}]`, filter.value);
      });

    } else {
      if (Array.isArray(value)) {
        value = value.join(',');
      }

      params = params.set(key, value.toString());
    }
  });

  return params;
}
