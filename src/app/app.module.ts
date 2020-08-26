import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Inject, LOCALE_ID, NgModule, PLATFORM_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotyModule } from './noty/noty.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';
import { isPlatformBrowser, Location, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { UserService } from './shared/services/user.service';
import { authInitFactory } from './shared/services/auth-init.factory';

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
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NavbarModule,
    HttpClientModule,
    NotyModule,
    QuillModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: APP_INITIALIZER, useFactory: authInitFactory, deps: [UserService, Location], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
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
    ImageResize = require('quill-image-resize-module').default;

    const BaseImageFormat = Quill.import('formats/image');
    const BaseVideoFormat = Quill.import('formats/video');
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

    class VideoFormat extends BaseVideoFormat {
      static create(value) {
        const iframe: HTMLElement = super.create(value);
        iframe.className = '';

        const wrapper = document.createElement('div');
        wrapper.classList.add('yt-video');
        wrapper.insertBefore(iframe, null);

        const wrapper2 = document.createElement('div');
        wrapper2.classList.add('yt-video-wrapper');
        wrapper2.insertBefore(wrapper, null);

        return wrapper2;
      }
    }

    Quill.register(ImageFormat, true);
    Quill.register(VideoFormat, true);
    Quill.register('modules/imageResize', ImageResize);
  }
}
