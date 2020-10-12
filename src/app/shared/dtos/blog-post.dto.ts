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

export class BlogPostCreateDto {
  name: string = '';
  slug: string = '';
  category: LinkedBlogCategoryDto;
  content: string = '';
  shortContent: string = '';
  createdAt: Date = new Date();
  publishedAt: Date;
  updatedAt: Date;
  isEnabled: boolean = true;
  linkedPosts: LinkedBlogPostDto[] = [];
  linkedProducts: LinkedProductDto[] = [];
  medias: MediaDto[] = [];
  metaTags: MetaTagsDto = new MetaTagsDto();
  sortOrder: number = 0;
  featuredMedia: MediaDto;
}

export class BlogPostDto extends BlogPostCreateDto {
  id: number;
}

