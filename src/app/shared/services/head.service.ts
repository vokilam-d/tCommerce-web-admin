import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HeadService {

  constructor(private title: Title,
              private meta: Meta) {
  }

  setTitle(title: string) {
    this.title.setTitle(`${title} | KL Admin`);
  }

  setNoindex() {
    this.meta.updateTag({ name: 'robots', content: 'noindex,nofollow' });
  }
}
