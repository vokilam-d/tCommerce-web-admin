import {
  ChangeDetectionStrategy,
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
import { IGridCell, IGridFilter, IGridValue } from './grid.interface';
import { PaginationComponent } from '../pagination/pagination.component';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';


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
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('blockInitialAnimation', [transition(':enter', [])]),
    trigger('slideToggle', [
      state('true', style({ 'height': '*', 'padding': '*' })),
      state('false', style({ 'height': 0, 'overflow': 'hidden', 'padding': 0, 'margin': 0, 'border-color': 'transparent' })),
      transition('* <=> *', animate('0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'))
    ])
  ]
})
export class GridComponent<T extends { isOpened?: boolean } = any> extends NgUnsubscribe implements OnInit {

  activeSorting: IGridSorting = null;
  private filtersMap = new Map<fieldName, string>();
  private search$ = new Subject<IGridFilter>();

  @Input() gridName: string;
  @Input() cells: IGridCell[] = [];
  @Input() itemsArray: T[] = [];
  @Input() isLoading: boolean = false;
  @Input() size: 'default' | 'small' = 'default';
  @Input() linkUrlSuffix: string;
  @Input() linkFieldName: string;
  @Input() linkTarget: '_self' | '_blank' = '_self';
  @Input() subItemsFieldName: string;
  @Input() trackByFieldName: string;
  @Input() pagesTotal: number;
  @Input() itemsFiltered: number;
  @Output('gridChange') changeEmitter = new EventEmitter<IGridValue>();
  @Output('itemSelect') itemSelectEmitter = new EventEmitter<T>();

  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;
  @ContentChildren('cellContent') cellContents: QueryList<TemplateRef<any>>;
  @ContentChildren('subCellContent') subCellContents: QueryList<TemplateRef<any>>;
  get cellContentsArray(): TemplateRef<any>[] { return this.cellContents.toArray(); }
  get subCellContentsArray(): TemplateRef<any>[] { return this.subCellContents.toArray(); }

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
    let value = (evt.target as HTMLInputElement).value;
    value = value.replace(/,/g, ''); // ',' sign is reserved as array delimiter

    this.search$.next({ fieldName: cell.fieldName, value })
  }

  getRouterLinkUrl(item: T): string[] | null {
    if (!this.linkUrlSuffix || !this.linkFieldName) {
      return null;
    }

    return [this.linkUrlSuffix, item[this.linkFieldName]];
  }

  onItemSelect(item: T) {
    this.itemSelectEmitter.emit(item);
  }

  trackBy(index: number, item: T) {
    return this.trackByFieldName ? item[this.trackByFieldName] : index;
  }

  private setActiveSorting() {
    const savedInfo = this.getSavedInfo();
    if (savedInfo && savedInfo.sorting) {
      this.activeSorting = savedInfo.sorting;
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
          if (evt.value) {
            this.filtersMap.set(evt.fieldName, evt.value);
          } else {
            this.filtersMap.delete(evt.fieldName);
          }
          this.emitChange();
        }
      );
  }
}
