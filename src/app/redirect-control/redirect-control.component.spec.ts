import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectControlComponent } from './redirect-control.component';

describe('RedirectControlComponent', () => {
  let component: RedirectControlComponent;
  let fixture: ComponentFixture<RedirectControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
