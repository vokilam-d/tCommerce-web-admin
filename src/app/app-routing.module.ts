import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageAction } from './shared/enums/category-page-action.enum';


const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/product-list/product-list.module').then(m => m.ProductListModule)
          },
          {
            path: 'add',
            loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
            data: { action: EPageAction.Add }
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
            data: { action: EPageAction.Edit }
          }
        ]
      },
      {
        path: 'attribute',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/attribute-list/attribute-list.module').then(m => m.AttributeListModule)
          },
          {
            path: 'add',
            loadChildren: () => import('./pages/attribute/attribute.module').then(m => m.AttributeModule),
            data: { action: EPageAction.Add }
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('./pages/attribute/attribute.module').then(m => m.AttributeModule),
            data: { action: EPageAction.Edit }
          }
        ]
      },
      {
        path: 'customer',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/customer-list/customer-list.module').then(m => m.CustomerListModule)
          },
          {
            path: 'add',
            loadChildren: () => import('./pages/customer/customer.module').then(m => m.CustomerModule),
            data: { action: EPageAction.Add }
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('./pages/customer/customer.module').then(m => m.CustomerModule),
            data: { action: EPageAction.Edit }
          }
        ]
      },
      {
        path: 'order',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/order-list/order-list.module').then(m => m.OrderListModule)
          },
          {
            path: 'add',
            children: [
              {
                path: '',
                loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule),
                data: { action: EPageAction.Add }
              },
              {
                path: 'based-on/:id',
                loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule),
                data: { action: EPageAction.AddBasedOn }
              }
            ]
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule),
            data: { action: EPageAction.Edit }
          },
          {
            path: 'view/:id',
            loadChildren: () => import('./pages/order-view/order-view.module').then(m => m.OrderViewModule)
          }
        ]
      },
      {
        path: 'shipping-method',
        loadChildren: () => import('./pages/shipping-method/shipping-method.module').then(m => m.ShippingMethodModule)
      },
      {
        path: 'payment-method',
        loadChildren: () => import('./pages/payment-method/payment-method.module').then(m => m.PaymentMethodModule)
      },
      {
        path: 'store-review',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/store-review-list/store-review-list.module').then(m => m.StoreReviewListModule)
          },
          {
            path: 'add',
            loadChildren: () => import('./pages/store-review/store-review.module').then(m => m.StoreReviewModule),
            data: { action: EPageAction.Add }
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('./pages/store-review/store-review.module').then(m => m.StoreReviewModule),
            data: { action: EPageAction.Edit }
          }
        ]
      },
      {
        path: 'product-review',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/product-review-list/product-review-list.module').then(m => m.ProductReviewListModule)
          },
          {
            path: 'add',
            loadChildren: () => import('./pages/product-review/product-review.module').then(m => m.ProductReviewModule),
            data: { action: EPageAction.Add }
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('./pages/product-review/product-review.module').then(m => m.ProductReviewModule),
            data: { action: EPageAction.Edit }
          }
        ]
      },
      {
        path: 'emails-test',
        loadChildren: () => import('./pages/emails-test/emails-test.module').then(m => m.EmailsTestModule)
      },
      {
        path: 'currency',
        loadChildren: () => import('./pages/currency/currency.module').then(m => m.CurrencyModule)
      },
      {
        path: '**',
        loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'admin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'corrected',
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
