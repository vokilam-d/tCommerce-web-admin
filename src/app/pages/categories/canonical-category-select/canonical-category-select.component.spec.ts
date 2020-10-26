import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanonicalCategorySelectComponent } from './canonical-category-select.component';

describe('CanonicalCategorySelectComponent', () => {
  let component: CanonicalCategorySelectComponent;
  let fixture: ComponentFixture<CanonicalCategorySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanonicalCategorySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanonicalCategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
