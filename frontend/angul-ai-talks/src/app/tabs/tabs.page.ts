import {Component, EventEmitter, Output} from '@angular/core';
import axios from "axios";
import * as globals from '../../globals';
import {environment} from "../../environments/environment.prod";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {


}
