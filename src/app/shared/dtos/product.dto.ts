import { ProductVariantDto } from './product-variant.dto';
import { ProductSelectedAttributeDto } from './selected-attribute.dto';

export class AddOrUpdateProductDto {
  isEnabled: boolean = true;
  name: string = '';
  categoryIds: number[] = [];
  attributes: ProductSelectedAttributeDto[] = [];
  variants: ProductVariantDto[] = [new ProductVariantDto()];
  sortOrder: number = 0;
}

export class ProductDto extends AddOrUpdateProductDto {
  id: number;
}
