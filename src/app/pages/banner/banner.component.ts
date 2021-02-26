import { Component, OnInit, ViewChild } from '@angular/core';
import { BannerTypeModalComponent } from './banner-type-modal/banner-type-modal.component';
import { UPLOADED_HOST } from '../../shared/constants/constants';
import { BannerService } from '../../shared/services/banner.service';
import { takeUntil } from 'rxjs/operators';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';
import { ProductLabelTypeEnum } from '../../shared/enums/product-label-type.enum';
import { EBannerItemType } from '../../shared/enums/banner-item-type.enum';


@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends NgUnsubscribe implements OnInit {

  bannerItems = new Array(4);
  bannerItemType: typeof EBannerItemType = EBannerItemType;
  clickedItemId: number;

  discountValue: number;
  uploadedHost = UPLOADED_HOST;
  itemImgSrc = '/admin/assets/images/plus.svg';

  @ViewChild(BannerTypeModalComponent) bannerTypeModalSelectorCmp: BannerTypeModalComponent;


  constructor(private bannerService: BannerService) {
    super();
  }

  ngOnInit(): void {
    this.setBannerItems();
  }

  private setBannerItems() {
    this.bannerService.sharedItem
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(bannerItem => {
        console.log(bannerItem);

        this.bannerItems[this.clickedItemId] = bannerItem;
        this.setDiscountValue(bannerItem.item);
    });
  }

  private setDiscountValue(item) {
    if (!item.oldPrice) { return; }
    this.discountValue = Math.ceil((item.oldPrice - item.price) / item.oldPrice * 100);
  }

  showBannerTypeModal(id: number) {
    this.clickedItemId = id;
    this.bannerTypeModalSelectorCmp.openModal();
  }

  getProductSrc(id: number): string {
    const bannerItemUrl = this.bannerItems[id].item.mediaUrl;
    return `${this.uploadedHost}${bannerItemUrl}`;
  }

  getPostSrc(id: number): string {
    const bannerItem = this.bannerItems[id].item;
    const bannerItemUrl = bannerItem.featuredMedia?.variantsUrls?.original;
    return `${this.uploadedHost}${bannerItemUrl}`;
  }

  getLabelClass(item) {
    switch (item.label) {
      case ProductLabelTypeEnum.New:
        return 'banner__label--new';
      case ProductLabelTypeEnum.Top:
        return 'banner__label--top';
    }
  }
}
