import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaAssetComponent } from './media-asset.component';

describe('MediaAssetComponent', () => {
  let component: MediaAssetComponent;
  let fixture: ComponentFixture<MediaAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
