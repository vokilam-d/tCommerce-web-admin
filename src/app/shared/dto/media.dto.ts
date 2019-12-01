import { EMediaVariant } from '../enums/media-variant.enum';

type VariantsUrls = {
  [k in EMediaVariant]: string;
};

export class MediaDto {
  variantsUrls: VariantsUrls = {
    [EMediaVariant.Original]: '',
    [EMediaVariant.Large]: '',
    [EMediaVariant.Medium]: '',
    [EMediaVariant.Small]: '',
  };

  altText: string;

  isHidden: boolean;

  size: string;

  dimensions: string;
}
