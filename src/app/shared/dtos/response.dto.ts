export class ResponseDto<T> {
  data: T;

  page?: number;
  pagesTotal?: number;
  itemsTotal?: number;
  itemsFiltered?: number;

  // error fields
  error?: string;
  message?: string;
  statusCode?: number;
  timestamp?: string;
  method?: string;
  path?: string;
}
