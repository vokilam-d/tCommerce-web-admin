import { ProductSelectedAttributeDto } from './selected-attribute.dto';
import { MediaDto } from './media.dto';
import { MetaTagsDto } from './meta-tags.dto';
import { ECurrency } from '../enums/currency.enum';

export class ProductVariantDto {
  id: string = '';
  name: string = '';
  sku: string = '';
  vendorCode: string = '';
  gtin: string = '';
  slug: string = '';
  attributes: ProductSelectedAttributeDto[] = [];
  isEnabled: boolean = false;
  price: number = 0;
  currency: ECurrency;
  priceInDefaultCurrency: number;
  medias: MediaDto[] = [];
  fullDescription: string = '';
  shortDescription: string = '';
  metaTags: MetaTagsDto = new MetaTagsDto();
  qty: number = 0;
  isDiscountApplicable: boolean = true;
  salesCount: number = 0;
  googleAdsProductTitle: string = '';
}
