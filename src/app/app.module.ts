import { BrowserModule } from '@angular/platform-browser';
import { Inject, LOCALE_ID, NgModule, PLATFORM_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { NotyModule } from './noty/noty.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';
import { isPlatformBrowser, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

declare const require: any;
let Quill: any = null;
let ImageResize: any = null;

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    NavbarModule,
    HttpClientModule,
    NotyModule,
    QuillModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.initQuill();
    }
  }

  initQuill(): void {
    Quill = require('quill');
    ImageResize = require('quill-image-resize-module');

    const BaseImageFormat = Quill.import('formats/image');
    const ImageFormatAttributesList = [
      'alt',
      'height',
      'width',
      'style'
    ];

    class ImageFormat extends BaseImageFormat {
      static formats(domNode) {
        return ImageFormatAttributesList.reduce(function(formats, attribute) {
          if (domNode.hasAttribute(attribute)) {
            formats[attribute] = domNode.getAttribute(attribute);
          }
          return formats;
        }, {});
      }
      format(name, value) {
        if (ImageFormatAttributesList.indexOf(name) > -1) {
          if (value) {
            this.domNode.setAttribute(name, value);
          } else {
            this.domNode.removeAttribute(name);
          }
        } else {
          super.format(name, value);
        }
      }
    }

    Quill.register(ImageFormat, true);
    Quill.register('modules/imageResize', ImageResize);
  }
}
