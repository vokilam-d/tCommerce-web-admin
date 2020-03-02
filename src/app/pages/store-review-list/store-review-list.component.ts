import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotyService } from '../../noty/noty.service';
import { StoreReviewDto } from '../../shared/dtos/store-review.dto';
import { StoreReviewService } from '../../shared/services/store-review.service';
import { IGridCell, IGridValue } from '../../grid/grid.interface';
import { getPropertyOf } from '../../shared/helpers/get-property-of.function';
import { Subscription } from 'rxjs';
import { GridComponent } from '../../grid/grid.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'store-review-list',
  templateUrl: './store-review-list.component.html',
  styleUrls: ['./store-review-list.component.scss']
})
export class StoreReviewListComponent implements OnInit, AfterViewInit {

  private fetchAllSub: Subscription;

  storeReviews: StoreReviewDto[] = [];
  itemsTotal: number = 0;
  itemsFiltered: number;
  pagesTotal: number = 1;
  isGridLoading: boolean = false;
  idFieldName = getPropertyOf<StoreReviewDto>('id');
  gridCells: IGridCell[] = storeReviewsGridCells;

  @ViewChild(GridComponent) gridCmp: GridComponent;

  constructor(private storeReviewsService: StoreReviewService,
              private route: ActivatedRoute,
              private notyService: NotyService,
              private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const gridValue = this.gridCmp.getValue();
    this.fetchStoreReviews(gridValue);
  }

  fetchStoreReviews(gridValue: IGridValue) {
    if (this.fetchAllSub) { this.fetchAllSub.unsubscribe(); }

    this.isGridLoading = true;
    this.fetchAllSub = this.storeReviewsService.fetchAllStoreReviews(gridValue)
      .pipe(this.notyService.attachNoty(), finalize(() => this.isGridLoading = false))
      .subscribe(
        response => {
          this.storeReviews = response.data;
          this.itemsTotal = response.itemsTotal;
          this.pagesTotal = response.pagesTotal;
        },
        error => console.warn(error)
      );
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}

const storeReviewsGridCells: IGridCell[] = [
  {
    isSearchable: false,
    label: 'Дата',
    initialWidth: 100,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<StoreReviewDto>('createdAt')
  },
  {
    isSearchable: true,
    label: 'Имя',
    initialWidth: 100,
    align: 'left',
    isImage: false,
    isSortable: false,
    fieldName: getPropertyOf<StoreReviewDto>('name')
  },
  {
    isSearchable: true,
    label: 'Текст',
    initialWidth: 500,
    align: 'left',
    isImage: false,
    isSortable: false,
    fieldName: getPropertyOf<StoreReviewDto>('text')
  },
  {
    isSearchable: false,
    label: 'Статус',
    initialWidth: 100,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<StoreReviewDto>('isEnabled')
  },
  {
    isSearchable: true,
    label: 'Ответ менеджера',
    initialWidth: 300,
    align: 'left',
    isImage: false,
    isSortable: false,
    fieldName: getPropertyOf<StoreReviewDto>('managerComment')
  }
];
