import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { CategoryComponent } from './category/category.component';
import { EPageAction } from '../../shared/enums/category-page-action.enum';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      {
        path: 'edit/:id',
        component: CategoryComponent,
        data: {
          action: EPageAction.Edit
        }
      },
      {
        path: 'add/parent/:parentId',
        component: CategoryComponent,
        data: {
          action: EPageAction.Add
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
