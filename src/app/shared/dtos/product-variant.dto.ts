import { ProductSelectedAttributeDto } from './selected-attribute.dto';
import { MediaDto } from './media.dto';
import { MetaTagsDto } from './meta-tags.dto';
import { DEFAULT_CURRENCY_CODE, ECurrencyCode } from '../enums/currency.enum';
import { LinkedProductDto } from './linked-product.dto';

export class ProductVariantDto {
  id: string = '';
  name: string = '';
  sku: string = '';
  vendorCode: string = '';
  gtin: string = '';
  slug: string = '';
  attributes: ProductSelectedAttributeDto[] = [];
  isEnabled: boolean = true;
  price: number = 0;
  oldPrice: number;
  currency: ECurrencyCode = DEFAULT_CURRENCY_CODE;
  priceInDefaultCurrency: number;
  oldPriceInDefaultCurrency: number;
  medias: MediaDto[] = [];
  fullDescription: string = '';
  shortDescription: string = '';
  metaTags: MetaTagsDto = new MetaTagsDto();
  qtyInStock: number = 0;
  sellableQty: number = 0;
  isDiscountApplicable: boolean = true;
  salesCount: number = 0;
  googleAdsProductTitle: string = '';
  relatedProducts: LinkedProductDto[] = [];
  crossSellProducts: LinkedProductDto[] = [];
}
