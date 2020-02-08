import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreReviewListComponent } from './store-review-list.component';

describe('StoreReviewListComponent', () => {
  let component: StoreReviewListComponent;
  let fixture: ComponentFixture<StoreReviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreReviewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
