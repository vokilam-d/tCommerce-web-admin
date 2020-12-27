import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { HeadService } from './shared/services/head.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  get isLoggedIn(): boolean { return this.userService.user !== null; };

  constructor(
    private userService: UserService,
    private headService: HeadService
  ) { }

  ngOnInit(): void {
    this.headService.setNoindex();
  }
}
