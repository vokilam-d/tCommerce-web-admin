import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogPostListComponent } from './blog-post-list.component';

const routes: Routes = [{ path: '', component: BlogPostListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogPostListRoutingModule { }
