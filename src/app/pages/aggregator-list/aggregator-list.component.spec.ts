import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorListComponent } from './aggregator-list.component';

describe('AggregatorListComponent', () => {
  let component: AggregatorListComponent;
  let fixture: ComponentFixture<AggregatorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregatorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
