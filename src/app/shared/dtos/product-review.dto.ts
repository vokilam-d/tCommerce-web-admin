import { MediaDto } from './media.dto';
import { ReviewSource } from '../enums/review-source.enum';

export class ProductReviewCommentDto {
  id: string = '';
  isEnabled: boolean = true;
  name: string = '';
  text: string = '';
  email: string = '';
  customerId: number = null;
  createdAt: Date;
}

export class ProductReviewDto {
  productId: number;
  productName: string;
  productVariantId: string;
  id: number;
  isEnabled: boolean = true;
  votesCount: number;
  name: string = '';
  text: string = '';
  email: string = '';
  customerId: number = null;
  rating: number = 5;
  sortOrder: number = 0;
  medias: MediaDto[] = [];
  comments: ProductReviewCommentDto[] = [];
  managerComment: string = '';
  createdAt: Date = new Date();
  source: ReviewSource = ReviewSource.Manager;
}
