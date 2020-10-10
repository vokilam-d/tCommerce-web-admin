import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogPostListRoutingModule } from './blog-post-list-routing.module';
import { BlogPostListComponent } from './blog-post-list.component';
import { SharedModule } from '../../shared/shared.module';
import { GridModule } from '../../grid/grid.module';


@NgModule({
  declarations: [BlogPostListComponent],
  imports: [
    CommonModule,
    BlogPostListRoutingModule,
    SharedModule,
    GridModule
  ]
})
export class BlogPostListModule { }
