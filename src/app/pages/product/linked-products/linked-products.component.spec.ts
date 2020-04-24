import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedProductsComponent } from './linked-products.component';

describe('LinkedProductsComponent', () => {
  let component: LinkedProductsComponent;
  let fixture: ComponentFixture<LinkedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
