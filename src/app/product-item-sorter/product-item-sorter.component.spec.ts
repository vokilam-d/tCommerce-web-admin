import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemSorterComponent } from './product-item-sorter.component';

describe('ProductItemSorterComponent', () => {
  let component: ProductItemSorterComponent;
  let fixture: ComponentFixture<ProductItemSorterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductItemSorterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemSorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
