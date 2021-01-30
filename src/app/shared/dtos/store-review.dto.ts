import { MediaDto } from './media.dto';
import { ReviewSource } from '../enums/review-source.enum';

export class StoreReviewDto {
  id: string = '';
  isEnabled: boolean = true;
  name: string = '';
  text: string = '';
  email: string = '';
  customerId: number = null;
  rating: number = 5;
  sortOrder: number = 0;
  medias: MediaDto[] = [];
  managerComment: string = '';
  createdAt: Date = new Date();
  source: ReviewSource = ReviewSource.Manager;
}
