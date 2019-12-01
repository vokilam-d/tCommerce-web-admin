import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MediaDto } from '../shared/dtos/media.dto';

@Component({
  selector: 'media-asset',
  templateUrl: './media-asset.component.html',
  styleUrls: ['./media-asset.component.scss']
})
export class MediaAssetComponent implements OnInit {

  @Input() media: MediaDto;
  @Output('remove') removeEmitter = new EventEmitter<MediaDto>();

  constructor() { }

  ngOnInit() {
  }

  remove() {
    this.removeEmitter.emit(this.media);
  }
}
