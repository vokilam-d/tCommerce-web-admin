import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewListViewerComponent } from './product-review-list-viewer.component';

describe('ProductReviewListViewerComponent', () => {
  let component: ProductReviewListViewerComponent;
  let fixture: ComponentFixture<ProductReviewListViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReviewListViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewListViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
