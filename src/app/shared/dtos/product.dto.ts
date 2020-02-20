import { ProductVariantDto } from './product-variant.dto';
import { ProductSelectedAttributeDto } from './selected-attribute.dto';
import { ProductBreadcrumbDto } from './product-breadcrumb.dto';

export class AddOrUpdateProductDto {
  isEnabled: boolean = true;
  name: string = '';
  categoryIds: number[] = [];
  breadcrumbs: ProductBreadcrumbDto[] = [];
  attributes: ProductSelectedAttributeDto[] = [];
  variants: ProductVariantDto[] = [new ProductVariantDto()];
  sortOrder: number = 0;
  reviewsCount: number;
  reviewsAvgRating: number;
}

export class ProductDto extends AddOrUpdateProductDto {
  id: number;
}
