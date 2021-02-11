import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { HeadService } from './shared/services/head.service';
import { DeviceService } from './shared/services/device-detector/device.service';
import { io } from 'socket.io-client';
import { SOCKET } from './shared/constants/constants';
import { NotyService } from './noty/noty.service';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private appVersion = '1.0';

  get isLoggedIn(): boolean { return this.userService.user !== null; };

  constructor(
    private userService: UserService,
    private headService: HeadService,
    private notyService: NotyService,
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.headService.setNoindex();

    this.handleVersion();
    this.handleServerRestart();
  }

  private handleVersion() {
    if (this.deviceService.isPlatformServer()) { return; }
    const version = localStorage.getItem('version');
    if (version === this.appVersion) { return;}

    localStorage.clear();
    localStorage.setItem('version', this.appVersion);
  }

  private handleServerRestart() {
    if (this.deviceService.isPlatformServer()) { return; }

    // const socket = io({ path: SOCKET.path, reconnectionAttempts: 5, reconnectionDelay: 30000, reconnectionDelayMax: 50000 });
    // socket.on(SOCKET.serverRestartTopic, () => {
    //   this.notyService.showErrorNoty(`Сессия устарела - учтите несохранённые изменения и обновите страницу.`)
    // });
    const socket = webSocket(`ws://${location.host}/admin/ws`);
    socket.subscribe(msg => {
      console.log({msg});
    });
  }
}
