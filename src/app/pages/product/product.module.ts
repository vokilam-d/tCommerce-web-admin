import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MediaAssetModule } from '../../media-asset/media-asset.module';
import { MediaUploaderModule } from '../../media-uploader/media-uploader.module';
import { CategorySelectModule } from '../../category-select/category-select.module';
import { AttributesEditorComponent } from './attribute-editor/attributes-editor.component';
import { AngularEditorModule } from 'src/app/angular-editor/angular-editor.module';
import { ReviewsViewerComponent } from './reviews-viewer/reviews-viewer.component';
import { RatingSelectorModule } from '../../rating-selector/rating-selector.module';
import { QuillModule } from 'ngx-quill';
import { PreloaderModule } from '../../preloader/preloader.module';
import { LinkedProductsComponent } from './linked-products/linked-products.component';
import { ProductSelectorModule } from '../../product-selector/product-selector.module';
import { ProductItemSorterModule } from '../../product-item-sorter/product-item-sorter.module';


@NgModule({
  declarations: [ProductComponent, AttributesEditorComponent, ReviewsViewerComponent, LinkedProductsComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MediaAssetModule,
    MediaUploaderModule,
    AngularEditorModule,
    CategorySelectModule,
    RatingSelectorModule,
    QuillModule,
    PreloaderModule,
    ProductSelectorModule,
    ProductItemSorterModule
  ],
  providers: []
})
export class ProductModule {
}
