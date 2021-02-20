export class ReviewAverageRatingDto {
  count: number;
  avgRating: number;
}

export class CustomerReviewsAverageRatingDto {
  storeReviews: ReviewAverageRatingDto;
  productReviews: ReviewAverageRatingDto;
}
