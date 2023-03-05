import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import * as globals from "../../globals";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import {environment} from "../../environments/environment.prod";
import axios from "axios";

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.scss'],
})
export class TchatComponent implements OnInit {
  ngOnInit() {}

  constructor() {
    (window as any).Pusher = Pusher;

    (window as any).Echo = new Echo({
      broadcaster: 'pusher',
      key: environment.pusher_api_key,
      cluster: 'eu',
      forceTLS: false,
      authorizer: (channel: any, options: any) => {
        return {
          authorize: (socketId: any, callback: any) => {
            axios.post(environment.endpoint + '/broadcasting/auth', {
              socket_id: socketId,
              channel_name: channel.name
            }, {
              headers: { Authorization: `Bearer ${globals.bearer}` }
            })
              .then(response => {
                callback(null, response.data);
              })
              .catch(error => {
                callback(error);
              });
          }
        };
      },
    });

    (window as any).Echo.private(`tchat.${globals.userId}`)
      .listen('NewMessage', (e: any) => {
        this.messageList.push(e.message);

        const interval = setInterval(() => {
          if (this.tchatWrapper) {
            this.tchatWrapper.nativeElement.scrollTop = this.tchatWrapper.nativeElement.scrollHeight;
            clearInterval(interval);
          }
        }, 1);
      });


    axios.get(environment.endpoint + '/api/message/' + globals.userId, {
      headers: { Authorization: `Bearer ${globals.bearer}` }
    })
      .then(response => {
        response.data.forEach((msg: any) => {
          this.messageList.push(msg);
        });

        const interval = setInterval(() => {
          if (this.tchatWrapper) {
            this.tchatWrapper.nativeElement.scrollTop = this.tchatWrapper.nativeElement.scrollHeight;
            clearInterval(interval);
          }
        }, 1);
      })
  };

  messageList:Array<any> = [];

  userName = globals.userName;

  message = '';

  @ViewChild('tchatWrapper') tchatWrapper: ElementRef | undefined;

  setMessage(event: Event) {
    this.message = (event.target as HTMLTextAreaElement).value;
  }
  submitMessage() {
    if (!this.message || this.message.length === 0) {
      return;
    }

    axios.post(environment.endpoint + '/api/message', {
      'message': this.message
    }, {
      headers: { Authorization: `Bearer ${globals.bearer}` }
    })
      .then(() => {
        const interval = setInterval(() => {
          if (this.tchatWrapper) {
            this.tchatWrapper.nativeElement.scrollTop = this.tchatWrapper.nativeElement.scrollHeight;
            clearInterval(interval);
          }
        }, 1);
      })

    this.message = '';
  }

}
