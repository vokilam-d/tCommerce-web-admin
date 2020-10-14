import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostSelectorComponent } from './post-selector.component';
import { GridModule } from '../grid/grid.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [PostSelectorComponent],
  exports: [
    PostSelectorComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    SharedModule
  ]
})
export class PostSelectorModule { }
