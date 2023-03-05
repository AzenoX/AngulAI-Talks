import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import axios from "axios";
import {environment} from "../../environments/environment.prod";
import * as globals from '../../globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  isLogin = true;
  loginError:string|null = null;
  registerError:string|null = null;
  fields = {
    'login_username': null,
    'login_password': null,
    'register_username': null,
    'register_password': null,
  };

  @Output() public isLoggedIn = new EventEmitter();

  constructor() { }

  ngOnInit() {}
  toSwitch() {
    this.isLogin = !this.isLogin;
  }
  updateField(event: Event, field: string) {
    (this.fields as any)[field] = (event.target as HTMLTextAreaElement).value;
  }
  login() {
    axios.post(environment.endpoint + '/api/login', {
      'name': this.fields['login_username'],
      'password': this.fields['login_password']
    })
      .then((response) => {
        globals.setBearer(response.data.authorisation.token);
        globals.setUserId(response.data.user.id);
        globals.setUserName(response.data.user.name);
        this.isLoggedIn.emit(true);
      })
      .catch((response) => {
        switch (response?.response?.status) {
          case 401:
            this.loginError = 'Invalid credentials';
            break;
          case 422:
            this.loginError = 'Invalid credentials';
            break;
          default:
            this.loginError = 'An error occurred';
            break;
        }

        setTimeout(() => {
          this.loginError = null;
        }, 3000)
      })
  }
  register() {
    axios.post(environment.endpoint + '/api/register', {
      'name': this.fields['register_username'],
      'password': this.fields['register_password']
    })
      .then((response) => {
        globals.setBearer(response.data.authorisation.token);
        globals.setUserId(response.data.user.id);
        globals.setUserName(response.data.user.name);
        this.isLoggedIn.emit(true);
      })
      .catch((response) => {
        switch (response.response.status) {
          case 422:
            this.registerError = 'Username already taken';
            break;
          default:
            this.registerError = 'An error occurred';
            break;
        }

        setTimeout(() => {
          this.registerError = null;
        }, 3000)
      })
  }

}
