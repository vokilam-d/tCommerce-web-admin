import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsTestComponent } from './emails-test.component';

describe('EmailsTestComponent', () => {
  let component: EmailsTestComponent;
  let fixture: ComponentFixture<EmailsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
