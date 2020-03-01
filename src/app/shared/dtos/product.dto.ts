import { ProductVariantDto } from './product-variant.dto';
import { ProductSelectedAttributeDto } from './selected-attribute.dto';
import { ProductBreadcrumbDto } from './product-breadcrumb.dto';
import { ECurrencyCode } from '../enums/currency.enum';

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

export class ProductVariantListItemDto {
  id: string;
  isEnabled: boolean;
  mediaUrl: string;
  name: string;
  sku: string;
  price: number;
  currency: ECurrencyCode;
  priceInDefaultCurrency: number;
  qty: number;
}

export class ProductListItemDto {
  id: number;
  mediaUrl: string;
  name: string;
  skus: string;
  prices: string;
  quantities: string;
  isEnabled: boolean;
  variants?: ProductVariantListItemDto[];
}
