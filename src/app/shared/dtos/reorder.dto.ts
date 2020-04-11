import { EReorderPosition } from '../enums/reorder-position.enum';

export class ReorderDto {
  id: number;
  targetId: number;
  position: EReorderPosition;
}

export class ProductReorderDto extends ReorderDto {
  categoryId: number;
}
