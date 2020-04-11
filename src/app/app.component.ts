import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get isLoggedIn(): boolean { return this.userService.user !== null; };

  constructor(private userService: UserService) {
  }
}
