import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesEditorComponent } from './attributes-editor.component';

describe('AttributesEditorComponent', () => {
  let component: AttributesEditorComponent;
  let fixture: ComponentFixture<AttributesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
