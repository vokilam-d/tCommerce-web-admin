import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreReviewListViewerComponent } from './store-review-list-viewer.component';

describe('StoreReviewListViewerComponent', () => {
  let component: StoreReviewListViewerComponent;
  let fixture: ComponentFixture<StoreReviewListViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreReviewListViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReviewListViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
