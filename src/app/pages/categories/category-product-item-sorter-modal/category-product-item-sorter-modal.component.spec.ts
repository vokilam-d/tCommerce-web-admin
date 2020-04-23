import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductItemSorterModalComponent } from './category-product-item-sorter-modal.component';

describe('CategoryProductItemSorterModalComponent', () => {
  let component: CategoryProductItemSorterModalComponent;
  let fixture: ComponentFixture<CategoryProductItemSorterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryProductItemSorterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryProductItemSorterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
