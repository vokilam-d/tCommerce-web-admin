import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../shared/services/head.service';
import { logMemory } from '../../shared/helpers/log-memory.function';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private headService: HeadService) { }

  ngOnInit() {
    this.headService.setTitle(`Dashboard`);
    setTimeout(() => {
      console.log('After "DashboardComponent" render');
      logMemory();
    }, 1000);
  }

}
