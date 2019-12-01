import { MetaTagsDto } from './meta-tags.dto';
import { MediaDto } from './media.dto';

export class AddOrUpdateProductDto {
  isEnabled: boolean;

  name: string;

  slug: string;

  sku: string;

  qty: number;

  price: number;

  shortDescription: string;

  fullDescription: string;

  categoryIds: number[];

  medias: MediaDto[];

  metaTags: MetaTagsDto;
}

export class ResponseProductDto extends AddOrUpdateProductDto {
  id: number;
}
