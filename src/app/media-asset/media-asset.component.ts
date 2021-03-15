import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MediaDto } from '../shared/dtos/media.dto';
import { UPLOADED_HOST } from '../shared/constants/constants';

@Component({
  selector: 'media-asset',
  templateUrl: './media-asset.component.html',
  styleUrls: ['./media-asset.component.scss']
})
export class MediaAssetComponent implements OnInit {

  isDetailsVisible: boolean = false;

  @Input() media: MediaDto;
  @Input() showRemoveBtn: boolean = true;
  @Output('remove') removeEmitter = new EventEmitter<MediaDto>();

  constructor() { }

  ngOnInit() {
  }

  remove() {
    this.removeEmitter.emit(this.media);
  }

  showDetails() {
    this.isDetailsVisible = true;
  }

  hideDetails() {
    this.isDetailsVisible = false;
  }

  getMediaUrl(original: boolean = false): string {
    return UPLOADED_HOST + (original ? this.media.variantsUrls.original : this.media.variantsUrls.large);
  }
}
