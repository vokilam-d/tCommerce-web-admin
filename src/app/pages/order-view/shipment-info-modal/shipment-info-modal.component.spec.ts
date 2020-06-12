import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentInfoModalComponent } from './shipment-info-modal.component';

describe('ShipmentInfoModalComponent', () => {
  let component: ShipmentInfoModalComponent;
  let fixture: ComponentFixture<ShipmentInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
