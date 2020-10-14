import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkedPostsComponent } from './linked-posts.component';
import { SharedModule } from '../../../shared/shared.module';
import { PostSelectorModule } from '../../../post-selector/post-selector.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LinkedPostsComponent],
  exports: [
    LinkedPostsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostSelectorModule,
    RouterModule
  ]
})
export class LinkedPostsModule { }
