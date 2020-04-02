import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaUploaderComponent } from './media-uploader.component';


@NgModule({
  declarations: [MediaUploaderComponent],
  imports: [
    CommonModule
  ],
  exports: [MediaUploaderComponent]
})
export class MediaUploaderModule { }
