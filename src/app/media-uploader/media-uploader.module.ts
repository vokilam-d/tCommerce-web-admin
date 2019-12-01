import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaUploaderComponent } from './media-uploader.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [MediaUploaderComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [MediaUploaderComponent]
})
export class MediaUploaderModule { }
