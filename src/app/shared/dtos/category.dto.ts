import { MetaTagsDto } from './meta-tags.dto';

export class AddOrUpdateCategoryDto {
  isEnabled: boolean;
  name: string;
  description: string;
  slug: string;
  parentId: number;
  metaTags: MetaTagsDto;
}

export class CategoryDto extends AddOrUpdateCategoryDto {
  id?: number;
}

export class CategoryTreeItem {
  id: CategoryDto['id'];
  name: CategoryDto['name'];
  children: CategoryTreeItem[];
}

export class CategoriesTreeDto {
  categories: CategoryTreeItem[];
}
