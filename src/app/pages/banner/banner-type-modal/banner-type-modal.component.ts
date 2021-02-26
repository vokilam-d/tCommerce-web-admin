import {Component, OnInit, ViewChild} from '@angular/core';
import { ProductSelectorComponent } from '../../../product-selector/product-selector.component';
import { BannerService } from '../../../shared/services/banner.service';
import { PostSelectorComponent } from '../../../post-selector/post-selector.component';
import { EBannerItemType } from '../../../shared/enums/banner-item-type.enum';
import { MediaDto } from '../../../shared/dtos/media.dto';
import { API_HOST } from '../../../shared/constants/constants';
import { FormControl } from '@angular/forms';
import { CustomValidators } from '../../../shared/classes/validators';
import { IBannerItem } from '../banner-item.interface';


@Component({
  selector: 'banner-type-modal',
  templateUrl: './banner-type-modal.component.html',
  styleUrls: ['./banner-type-modal.component.scss']
})
export class BannerTypeModalComponent implements OnInit {

  isModalVisible = false;
  isItemModalVisible = false;
  isCategoryModalVisible = false;

  mediaDto: MediaDto;
  url: FormControl = new FormControl('', {
    validators: CustomValidators.slug,
    updateOn: 'blur'
  });
  categories = new FormControl([]);

  @ViewChild(ProductSelectorComponent) productSelectorCmp: ProductSelectorComponent;
  @ViewChild(PostSelectorComponent) postSelectorCmp: PostSelectorComponent;


  constructor(private bannerService: BannerService) { }

  ngOnInit(): void { }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  showProductSelector() {
    this.closeModal();
    this.productSelectorCmp.showSelector();
  }

  showPostSelector() {
    this.closeModal();
    this.postSelectorCmp.showSelector();
  }

  showItemModal() {
    this.closeModal();
    this.isItemModalVisible = true;
  }

  showCategorySelectorModal() {
    this.isCategoryModalVisible = true;
  }

  closeItemModal() {
    this.isItemModalVisible = false;
  }

  closeCategorySelectorModal() {
    this.closeModal();
    this.isCategoryModalVisible = false;
  }

  onProductSelect({ variant }) {
    const productItem: IBannerItem = {
      item: variant,
      type: EBannerItemType.product
    };

    this.bannerService.updateBannerItems(productItem);
    this.productSelectorCmp.hideSelector();
  }

  onPostSelect(post) {
    const postItem: IBannerItem = {
      item: post,
      type: EBannerItemType.post
    };

    this.bannerService.updateBannerItems(postItem);
    this.postSelectorCmp.hideSelector();
  }

  onMediaRemove() {
    this.mediaDto = null;
  }

  getMediaUploadUrl() {
    return `${API_HOST}/api/v1/admin/banner/media`;
  }

  mediaUploaded(media: MediaDto) {
    this.mediaDto = media;
  }

  isControlInvalid(control) {
    return !control.valid && control.touched;
  }
}
