import {Component, Input} from '@angular/core';
import * as globals from '../globals';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {environment} from "../environments/environment.prod";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isLoggedIn = globals.bearer !== null;
  constructor() {}
}
