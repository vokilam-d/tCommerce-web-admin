import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaAssetComponent } from './media-asset.component';


@NgModule({
  declarations: [MediaAssetComponent],
  imports: [
    CommonModule
  ],
  exports: [MediaAssetComponent]
})
export class MediaAssetModule { }
