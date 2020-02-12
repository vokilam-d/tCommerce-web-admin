import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductReviewService } from '../../../shared/services/product-review.service';
import { ProductReviewDto } from '../../../shared/dtos/product-review.dto';

@Component({
  selector: 'reviews-viewer',
  templateUrl: './reviews-viewer.component.html',
  styleUrls: ['./reviews-viewer.component.scss']
})
export class ReviewsViewerComponent implements OnChanges {

  reviews: ProductReviewDto[] = [];
  @Input() productId: number;

  constructor(private productReviewService: ProductReviewService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.productId && changes.productId.currentValue) {
      this.fetchReviews(changes.productId.currentValue);
    }
  }

  private fetchReviews(productId: number) {
    this.productReviewService.fetchProductReviewsByProductId(productId)
      .subscribe(
        response => {
          this.reviews = response.data;
        },
        error => console.error(error)
      );
  }

}
