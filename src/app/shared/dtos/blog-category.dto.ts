import { MetaTagsDto } from './meta-tags.dto';

export class BlogCategoryCreateDto {
  id?: any;
  content: string;
  isEnabled: boolean;
  metaTags: MetaTagsDto;
  name: string;
  slug: string;
  sortOrder: number;
}

export class BlogCategoryDto extends BlogCategoryCreateDto {
  id: number;
}
