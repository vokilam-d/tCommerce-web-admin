import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPackItemModalComponent } from './confirm-pack-item-modal.component';

describe('ConfirmPackItemModalComponent', () => {
  let component: ConfirmPackItemModalComponent;
  let fixture: ComponentFixture<ConfirmPackItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPackItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPackItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
