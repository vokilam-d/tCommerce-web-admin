import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedPostsComponent } from './linked-posts.component';

describe('LinkedPostsComponent', () => {
  let component: LinkedPostsComponent;
  let fixture: ComponentFixture<LinkedPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
