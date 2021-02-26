import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IBannerItem } from '../../pages/banner/banner-item.interface';


@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private bannerItemDataSource = new Subject<IBannerItem>();
  sharedItem = this.bannerItemDataSource.asObservable();

  constructor() { }

  updateBannerItems(item: IBannerItem) {
    this.bannerItemDataSource.next(item);
  }
}
