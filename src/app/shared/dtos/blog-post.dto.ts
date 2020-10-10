import { MetaTagsDto } from './meta-tags.dto';
import { MediaDto } from './media.dto';
import { LinkedProductDto } from './linked-product.dto';

export class LinkedBlogCategoryDto {
  id: number;
  name: string;
  slug: string;
}

export class LinkedBlogPostDto {
  id: number;
  name: string;
  slug: string;
  sortOrder: number;
}

export class AdminBlogPostCreateDto {
  name: string;
  slug: string;
  category: LinkedBlogCategoryDto;
  content: string;
  shortContent: string;
  createdAt: Date;
  publishedAt: Date;
  updatedAt: Date;
  isEnabled: boolean;
  linkedPosts: LinkedBlogPostDto[];
  linkedProducts: LinkedProductDto[];
  medias: MediaDto[];
  metaTags: MetaTagsDto;
  sortOrder: number;
  featuredMedia: MediaDto;
}

export class AdminBlogPostDto extends AdminBlogPostCreateDto {
  id: number;
}

