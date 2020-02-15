import { TestBed } from '@angular/core/testing';

import { QuillHelperService } from './quill-helper.service';

describe('QuillHelperService', () => {
  let service: QuillHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuillHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
