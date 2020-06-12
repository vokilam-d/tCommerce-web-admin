import { TestBed } from '@angular/core/testing';

import { ShipmentSenderService } from './shipment-sender.service';

describe('ShipmentSenderService', () => {
  let service: ShipmentSenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmentSenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
