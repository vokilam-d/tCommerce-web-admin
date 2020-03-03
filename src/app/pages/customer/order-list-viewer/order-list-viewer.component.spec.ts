import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListViewerComponent } from './order-list-viewer.component';

describe('OrderListViewerComponent', () => {
  let component: OrderListViewerComponent;
  let fixture: ComponentFixture<OrderListViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
