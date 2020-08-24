import { ProductSelectedAttributeDto } from './selected-attribute.dto';
import { MediaDto } from './media.dto';
import { MetaTagsDto } from './meta-tags.dto';
import { DEFAULT_CURRENCY_CODE, ECurrencyCode } from '../enums/currency.enum';
import { LinkedProductDto } from './linked-product.dto';

export class AddOrUpdateProductVariantDto {
  name: string = '';
  createRedirect: boolean;
  vendorCode: string = '';
  gtin: string = '';
  slug: string = '';
  attributes: ProductSelectedAttributeDto[] = [];
  isEnabled: boolean = true;
  price: number = 0;
  oldPrice: number;
  currency: ECurrencyCode = DEFAULT_CURRENCY_CODE;
  medias: MediaDto[] = [];
  fullDescription: string = '';
  shortDescription: string = '';
  metaTags: MetaTagsDto = new MetaTagsDto();
  qtyInStock: number = 0;
  isDiscountApplicable: boolean = true;
  isIncludedInShoppingFeed: boolean = true;
  googleAdsProductTitle: string = '';
  relatedProducts: LinkedProductDto[] = [];
  crossSellProducts: LinkedProductDto[] = [];
}

export class ProductVariantDto extends AddOrUpdateProductVariantDto {
  id: string = '';
  sku: string = '';
  priceInDefaultCurrency: number;
  oldPriceInDefaultCurrency: number;
  sellableQty: number = 0;
  salesCount: number = 0;
}
