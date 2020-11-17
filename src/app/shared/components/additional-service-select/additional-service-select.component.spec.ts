import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalServiceSelectComponent } from './additional-service-select.component';

describe('AdditionalServiceSelectComponent', () => {
  let component: AdditionalServiceSelectComponent;
  let fixture: ComponentFixture<AdditionalServiceSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalServiceSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalServiceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
