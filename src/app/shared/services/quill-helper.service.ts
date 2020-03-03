import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuillModules } from 'ngx-quill';
import Quill from 'quill';
import { inputMediaAcceptTypes } from '../constants/constants';
import { MediaDto } from '../dtos/media.dto';

@Injectable({
  providedIn: 'root'
})
export class QuillHelperService {

  constructor(private http: HttpClient) { }

  getEditorModules(): QuillModules {
    const helper = this;
    return {
      toolbar: {
        container: [
          [{ header: [false, 1, 2, 3, 4, 5, 6] }],
          ['bold', 'italic', 'underline'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'/*, 'video'*/],
          ['clean']
        ],
        handlers: {
          image: function () { helper.imageUploadHandler.call(helper, this.quill) }
        }
      },
      imageResize: {}
    }
  }

  private imageUploadHandler(quill: Quill) {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', inputMediaAcceptTypes);
    fileInput.click();

    fileInput.addEventListener('change', () => {
      const file = fileInput.files && fileInput.files.item(0);
      if (!file) { return; }

      const payload = new FormData();
      payload.append('file', file, file.name);

      this.http.post(this.getMediaUploadUrl(), payload, { responseType: 'text' })
        .subscribe(
          url => {
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', `http://localhost:3500${url}`, 'user');
            quill.setSelection(range.index + 1, 0, 'silent');
          },
          error => console.warn(error)
        );
    });
  }

  getMediaUploadUrl() {
    return `http://localhost:3500/api/v1/admin/wysiwyg/media`;
  }
}
