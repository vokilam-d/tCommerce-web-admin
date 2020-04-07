import { Component, ContentChildren, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CategoriesService } from './categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CategoryTreeItem, CategoryDto } from '../../shared/dtos/category.dto';
import { NotyService } from '../../noty/noty.service';
import { finalize } from 'rxjs/operators';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';
import { DraggableItemDirective } from '../../shared/directives/draggable-item/draggable-item.directive';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends NgUnsubscribe implements OnInit, OnDestroy {

  categories: CategoryTreeItem[];
  isLoading: boolean = false;

  constructor(private categoriesService: CategoriesService,
              private router: Router,
              private notyService: NotyService,
              private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.fetchCategoriesTree();
    this.categoriesService.categoryUpdated$.subscribe(_ => this.fetchCategoriesTree());
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.categoriesService.removeSelectedCategoryId();
  }

  fetchCategoriesTree() {
    this.isLoading = true;
    this.categoriesService.fetchCategoriesTree()
      .pipe(this.notyService.attachNoty(), finalize(() => this.isLoading = false))
      .subscribe(
        response => {
          this.categories = response.data;
        },
        error => console.warn(error)
      );
  }

  selectCategory(category: CategoryDto) {
    this.categoriesService.setSelectedCategoryId(category.id);
    this.router.navigate(['edit', category.id], { relativeTo: this.route });
  }

  addRootCategory() {
    this.addCategory(0);
  }

  addSubCategory() {
    this.addCategory(this.categoriesService.selectedCategoryId);
  }

  private addCategory(id: string | number) {
    this.categoriesService.removeSelectedCategoryId();
    this.router.navigate(['add', 'parent', id], { relativeTo: this.route });
  }
}
