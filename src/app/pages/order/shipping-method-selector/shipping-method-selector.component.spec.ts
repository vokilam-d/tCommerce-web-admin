import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingMethodSelectorComponent } from './shipping-method-selector.component';

describe('ShippingMethodSelectorComponent', () => {
  let component: ShippingMethodSelectorComponent;
  let fixture: ComponentFixture<ShippingMethodSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingMethodSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingMethodSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
