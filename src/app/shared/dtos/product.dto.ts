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
  oldPrice: number;
  currency: ECurrencyCode;
  priceInDefaultCurrency: number;
  oldPriceInDefaultCurrency: number;
  qtyInStock: number;
  sellableQty: number;
}

export class ProductListItemDto {
  id: number;
  mediaUrl: string;
  name: string;
  skus: string;
  prices: string;
  quantitiesInStock: string;
  sellableQuantities: string;
  isEnabled: boolean;
  variants?: ProductVariantListItemDto[];
}
