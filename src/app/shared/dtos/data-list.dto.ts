import { IPagination } from '../../pagination/pagination.interface';

export interface IDataListResponseDto<T> {
  data: T;
  page: number;
  itemsTotal: number;
  itemsFiltered?: number;
}

export type DataListRequestParamsDto = IPagination & {
  [key: string]: string;
}
