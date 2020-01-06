import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductService } from '../../shared/services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MediaAssetModule } from '../../media-asset/media-asset.module';
import { MediaUploaderModule } from '../../media-uploader/media-uploader.module';
import { CategorySelectModule } from '../../category-select/category-select.module';
import { AttributesEditorComponent } from './attribute-selector/attributes-editor.component';
import { AttributeService } from '../../shared/services/attribute.service';
import { AngularEditorModule } from 'src/app/angular-editor/angular-editor.module';


@NgModule({
  declarations: [ProductComponent, AttributesEditorComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MediaAssetModule,
    MediaUploaderModule,
    AngularEditorModule,
    CategorySelectModule
  ],
  providers: [
    ProductService,
    AttributeService
  ]
})
export class ProductModule { }
