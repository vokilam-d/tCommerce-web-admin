import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesService } from './categories.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '../../angular-editor/angular-editor.module';
import { SharedModule } from '../../shared/shared.module';
import { PreloaderModule } from '../../preloader/preloader.module';
import { ProductItemSorterComponent } from './product-item-sorter/product-item-sorter.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryComponent,
    ProductItemSorterComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    SharedModule,
    PreloaderModule
  ],
  providers: [
    CategoriesService
  ]
})
export class CategoriesModule { }
