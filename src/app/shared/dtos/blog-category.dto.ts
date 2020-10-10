import { MetaTagsDto } from './meta-tags.dto';

export class AdminBlogCategoryCreateDto {
  id?: any;
  content: string;
  isEnabled: boolean;
  metaTags: MetaTagsDto;
  name: string;
  slug: string;
  sortOrder: number;
}

export class AdminBlogCategoryDto extends AdminBlogCategoryCreateDto {
  id: number;
}
