import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogPostRoutingModule } from './blog-post-routing.module';
import { BlogPostComponent } from './blog-post.component';
import { PreloaderModule } from '../../preloader/preloader.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [BlogPostComponent],
  imports: [
    CommonModule,
    BlogPostRoutingModule,
    PreloaderModule,
    ReactiveFormsModule
  ]
})
export class BlogPostModule { }
