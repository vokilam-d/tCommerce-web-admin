import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from '../../pagination/pagination.component';
import { NotyService } from '../../noty/noty.service';
import { IPagination } from '../../pagination/pagination.interface';
import { ProductReviewDto } from '../../shared/dtos/product-review.dto';
import { ProductReviewService } from '../../shared/services/product-review.service';

@Component({
  selector: 'product-review-list',
  templateUrl: './product-review-list.component.html',
  styleUrls: ['./product-review-list.component.scss']
})
export class ProductReviewListComponent implements OnInit, AfterViewInit {

  productReviews: ProductReviewDto[] = [];
  itemsTotal: number = 0;
  pagesTotal: number = 1;

  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;

  constructor(private productReviewsService: ProductReviewService,
              private route: ActivatedRoute,
              private notyService: NotyService,
              private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const pagination = this.paginationCmp.getValue();
    this.fetchProductReviews(pagination);
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  fetchProductReviews(pagination: IPagination) {
    this.productReviewsService.fetchAllProductReviews(pagination)
      .pipe(this.notyService.attachNoty())
      .subscribe(
        response => {
          this.productReviews = response.data;
          this.itemsTotal = response.itemsTotal;
          this.pagesTotal = response.pagesTotal;
        },
        error => console.warn(error)
      );
  }
}
