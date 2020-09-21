import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../shared/services/head.service';
import { logMemory } from '../../shared/helpers/log-memory.function';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private headService: HeadService) { }

  ngOnInit() {
    this.headService.setTitle(`404`);
    setTimeout(() => {
      console.log('After "NotFoundComponent" render');
      logMemory();
    }, 1000);
  }

}
