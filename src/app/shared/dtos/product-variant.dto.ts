import { ProductSelectedAttributeDto } from './selected-attribute.dto';
import { MediaDto } from './media.dto';
import { MetaTagsDto } from './meta-tags.dto';

export class ProductVariantDto {
  id: string = '';
  name: string = '';
  sku: string = '';
  slug: string = '';
  attributes: ProductSelectedAttributeDto[] = [];
  isEnabled: boolean = false;
  price: number = 0;
  medias: MediaDto[] = [];
  fullDescription: string = '';
  shortDescription: string = '';
  metaTags: MetaTagsDto = new MetaTagsDto();
  qty: number = 0;
  isDiscountApplicable: boolean = true;
  salesCount: number;
}
