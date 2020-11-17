import { ProductListItemDto } from '../shared/dtos/product.dto';

export class ProductItemWithSortOrder extends ProductListItemDto {
  sortOrder: number;
  isSortOrderFixed: boolean;
}
