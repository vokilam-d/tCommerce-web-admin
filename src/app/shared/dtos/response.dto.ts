export class ResponseDto<T> {
  data: T;

  // error fields
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  method: string;
  path: string;
}

export class ResponsePaginationDto<T> extends ResponseDto<T>{
  page: number;
  pagesTotal: number;
  itemsTotal: number;
  itemsFiltered?: number;
}
