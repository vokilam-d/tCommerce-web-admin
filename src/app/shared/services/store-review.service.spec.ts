import { TestBed } from '@angular/core/testing';

import { StoreReviewService } from './store-review.service';

describe('ProductReviewService', () => {
  let service: StoreReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
