import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { IGridCell, IGridValue, IGridFilter } from './grid.interface';
import { PaginationComponent } from '../pagination/pagination.component';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';


type fieldName = string;

interface IGridSorting {
  fieldName: fieldName;
  isDescOrder: boolean;
}

interface ISavedGridInfo {
  sorting: IGridSorting;
}

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent extends NgUnsubscribe implements OnInit {

  activeSorting: IGridSorting = null;
  private filtersMap = new Map<fieldName, string>();
  private search$ = new Subject<IGridFilter>();

  @Input() gridName: string;
  @Input() cells: IGridCell[] = [];
  @Input() itemsArray: any[] = [];
  @Input() isLoading: boolean = false;
  @Input() linkUrl: string;
  @Input() linkFieldName: string;
  @Input() pagesTotal: number;
  @Input() itemsFiltered: number;
  @Output('gridChange') changeEmitter = new EventEmitter<IGridValue>();

  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;
  @ContentChildren('cellContent') cellContents: QueryList<TemplateRef<any>>;
  get cellContentsArray(): TemplateRef<any>[] { return this.cellContents.toArray(); }

  constructor() {
    super();
  }

  ngOnInit() {
    this.setActiveSorting();
    this.handleSearch();
  }

  onHeadCellClick(cell: IGridCell) {
    if (!cell.isSortable) { return; }

    if (this.activeSorting && this.activeSorting.fieldName === cell.fieldName) {
      this.activeSorting.isDescOrder = !this.activeSorting.isDescOrder;
    } else {
      this.activeSorting = { fieldName: cell.fieldName, isDescOrder: true };
    }

    this.emitChange();
  }

  emitChange() {
    const value = this.getValue();
    this.changeEmitter.emit(value);
    this.setSavedInfo();
  }

  getValue(): IGridValue {
    const gridValue: IGridValue = {
      ...this.paginationCmp.getValue(),
      filters: []
    };
    this.filtersMap.forEach((value, key) => gridValue.filters.push({ fieldName: key, value }));


    if (this.activeSorting) {
      gridValue.sort = this.activeSorting.fieldName;

      if (this.activeSorting.isDescOrder) {
        gridValue.sort = '-' + gridValue.sort;
      }
    }

    return gridValue;
  }

  onSearchInput(cell: IGridCell, evt: Event) {
    this.search$.next({ fieldName: cell.fieldName, value: (evt.target as HTMLInputElement).value })
  }

  private setActiveSorting() {
    const savedInfo = this.getSavedInfo();
    if (savedInfo && savedInfo.sorting) {
      this.activeSorting = savedInfo.sorting;

    } else {
      const firstSortableCell = this.cells.find(cell => cell.isSortable);
      if (firstSortableCell) {
        this.activeSorting = { fieldName: firstSortableCell.fieldName, isDescOrder: true };
      }
    }
  }

  private getSavedInfo(): ISavedGridInfo | null {
    if (!this.gridName) {
      return null;
    }

    return JSON.parse(localStorage.getItem(`grid-info-${this.gridName}`));
  }

  private setSavedInfo() {
    if (!this.gridName) {
      return;
    }

    const savedInfo: ISavedGridInfo = {
      sorting: this.activeSorting
    };
    localStorage.setItem(`grid-info-${this.gridName}`, JSON.stringify(savedInfo));
  }

  private handleSearch() {
    this.search$
      .pipe( takeUntil(this.ngUnsubscribe), debounceTime(100) )
      .subscribe(
        evt => {
          this.filtersMap.set(evt.fieldName, evt.value);
          this.emitChange();
        }
      );
  }
}
