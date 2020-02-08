import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from '../../pagination/pagination.component';
import { NotyService } from '../../noty/noty.service';
import { IPagination } from '../../pagination/pagination.interface';
import { StoreReviewDto } from '../../shared/dtos/store-review.dto';
import { StoreReviewService } from '../../shared/services/store-review.service';

@Component({
  selector: 'store-review-list',
  templateUrl: './store-review-list.component.html',
  styleUrls: ['./store-review-list.component.scss']
})
export class StoreReviewListComponent implements OnInit, AfterViewInit {

  storeReviews: StoreReviewDto[] = [];
  itemsTotal: number = 0;
  pagesTotal: number = 1;

  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;

  constructor(private storeReviewsService: StoreReviewService,
              private route: ActivatedRoute,
              private notyService: NotyService,
              private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const pagination = this.paginationCmp.getValue();
    this.fetchStoreReviews(pagination);
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  fetchStoreReviews(pagination: IPagination) {
    this.storeReviewsService.fetchAllStoreReviews(pagination)
      .pipe(this.notyService.attachNoty())
      .subscribe(
        response => {
          this.storeReviews = response.data;
          this.itemsTotal = response.itemsTotal;
          this.pagesTotal = response.pagesTotal;
        },
        error => console.warn(error)
      );
  }
}
