import { IPagination } from '../pagination/pagination.interface';

export interface IGridFilter {
  fieldName: string;
  value: string;
}

export interface IGridValue extends IPagination {
  sort?: string;
  filters?: IGridFilter[]; // rm '?'
}

export interface IGridCell {
  label: string;
  align: 'center' | 'left' | 'right';
  fieldName: string;
  isSortable: boolean;
  isSearchable: boolean;
  initialWidth: number;
  isImage: boolean;
  isDisplayBlock?: boolean;
}
