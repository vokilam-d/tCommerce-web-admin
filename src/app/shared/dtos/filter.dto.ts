class PaginationDto {
  sort: string;
  limit: number;
  page: number;
}

export type FilterDto = PaginationDto & {
  [key: string]: string;
}
