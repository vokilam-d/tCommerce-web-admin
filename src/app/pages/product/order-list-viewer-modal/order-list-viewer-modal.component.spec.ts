import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListViewerModalComponent } from './order-list-viewer-modal.component';

describe('OrderListViewerModalComponent', () => {
  let component: OrderListViewerModalComponent;
  let fixture: ComponentFixture<OrderListViewerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListViewerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListViewerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
