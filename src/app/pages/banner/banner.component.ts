import { Component, OnInit, ViewChild } from '@angular/core';
import { BannerTypeModalComponent } from './banner-type-modal/banner-type-modal.component';
import { UPLOADED_HOST } from '../../shared/constants/constants';
import { BannerService } from '../../shared/services/banner.service';
import { takeUntil } from 'rxjs/operators';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';
import { ProductLabelTypeEnum } from '../../shared/enums/product-label-type.enum';
import { EBannerItemType } from '../../shared/enums/banner-item-type.enum';
import { CreateBannerItemDto } from '../../shared/dtos/create-banner-item.dto';
import { UpdateBannerDto } from '../../shared/dtos/update-banner.dto';


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
    this.onInit();
  }

  onInit() {
    this.bannerService.fetchBanner()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          this.bannerItems = response.data;

          this.bannerItems.forEach(bannerItem => {
            this.setDiscountValue(bannerItem);
          });
      },
        error => console.warn(error)
      );
  }

  createBannerItem(item: CreateBannerItemDto) {
    this.bannerService.createBannerItem(item)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          const bannerItem = response.data;

          this.bannerItems.splice(this.clickedItemId, 1, bannerItem);

          this.bannerItems[this.clickedItemId] = bannerItem;
          this.setDiscountValue(bannerItem);
          },
        error => console.warn(error)
      );
  }

  // private setBannerItems() {
    // this.bannerService.fetchBanner()
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe(bannerItem => {
    //     console.log(bannerItem);

        // this.bannerItems[this.clickedItemId] = bannerItem;
        // this.setDiscountValue(bannerItem.item);
    // });
  // }

  private setDiscountValue(item) {
    if (!item.oldPrice) { return; }
    this.discountValue = Math.ceil((item.oldPrice - item.price) / item.oldPrice * 100);
  }

  showBannerTypeModal(id: number) {
    this.clickedItemId = id;
    this.bannerTypeModalSelectorCmp.openModal();
  }

  getProductSrc(id: number): string {
    const bannerItemUrl = this.bannerItems[id]?.media?.variantsUrls?.original;
    return `${this.uploadedHost}${bannerItemUrl}`;
  }

  getPostSrc(id: number): string {
    const bannerItem = this.bannerItems[id];
    const bannerItemUrl = bannerItem.media?.variantsUrls?.original;
    return `${this.uploadedHost}${bannerItemUrl}`;
  }

  getLabelClass(item) {
    switch (item?.label) {
      case ProductLabelTypeEnum.New:
        return 'banner__label--new';
      case ProductLabelTypeEnum.Top:
        return 'banner__label--top';
    }
  }

  save() {
    const updatedBanner = this.bannerItems.map(bannerItem => {
      return {
        id: bannerItem.id,
        type: bannerItem.type
      };
    });

    const createdBannerItems: UpdateBannerDto = {
      bannerItems: updatedBanner
    };

    this.bannerService.updateBanner(createdBannerItems)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          this.bannerItems = response.data;

          this.bannerItems.forEach(bannerItem => {
            this.setDiscountValue(bannerItem);
          });
      },
        error => console.warn(error)
      );
  }
}
