import { MetaTagsDto } from './meta-tags.dto';

export class AddOrUpdateCategoryDto {
  isEnabled: boolean;

  name: string;

  description: string;

  slug: string;

  parentId: number;

  metaTags: MetaTagsDto;
}

export class ResponseCategoryDto extends AddOrUpdateCategoryDto {
  id?: number;
}

export class CategoryTreeItem {
  id: ResponseCategoryDto['id'];
  name: ResponseCategoryDto['name'];
  children: CategoryTreeItem[];
}

export class AdminCategoriesTreeDto {
  categories: CategoryTreeItem[];
}
