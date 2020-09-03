import { ProductVariantDto } from './product-variant.dto';
import { ProductSelectedAttributeDto } from './selected-attribute.dto';
import { ProductBreadcrumbDto } from './product-breadcrumb.dto';
import { ECurrencyCode } from '../enums/currency.enum';

export class ProductCategoryDto {
  id: number;
  name?: string;
  slug?: string;
  sortOrder?: number;
}

export class AddOrUpdateProductDto {
  isEnabled: boolean = true;
  name: string = '';
  categories: ProductCategoryDto[] = [];
  breadcrumbs: ProductBreadcrumbDto[] = [];
  attributes: ProductSelectedAttributeDto[] = [];
  variants: ProductVariantDto[] = [new ProductVariantDto()];
  reviewsCount: number;
  reviewsAvgRating: number;
}

export class ProductDto extends AddOrUpdateProductDto {
  id: number;
}

export class ProductVariantListItemDto {
  id: string;
  isEnabled: boolean;
  attributes: ProductSelectedAttributeDto[];
  mediaUrl: string;
  name: string;
  sku: string;
  vendorCode: string;
  price: number;
  oldPrice: number;
  currency: ECurrencyCode;
  priceInDefaultCurrency: number;
  oldPriceInDefaultCurrency: number;
  qtyInStock: number;
  sellableQty: number;
  salesCount: number;
}

export class ProductListItemDto {
  id: number;
  categories: ProductCategoryDto[];
  attributes: ProductSelectedAttributeDto[];
  mediaUrl: string;
  name: string;
  skus: string;
  vendorCodes: string;
  prices: string;
  quantitiesInStock: string;
  sellableQuantities: string;
  isEnabled: boolean;
  variants?: ProductVariantListItemDto[];
  salesCounts: string;
  createdAt: Date;
  updatedAt: Date;
}
