import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { UsersService } from 'src/app/_services/users.service';
import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/Message';
import { error } from 'protractor';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css']
})
export class MemberMessageComponent implements OnInit {

  @Input() recipentId: number;
  messages: Message[];
  newMessage: any = {}


  constructor(private usersService: UsersService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getMessageThread();
  }


  getMessageThread() {
    const currentUserId= +this.authService.tokenDecoded.nameid;
    this.usersService.getMessageThread(this.authService.tokenDecoded.nameid, this.recipentId)
      .pipe(
        tap(((messages: Message[]) => {
          // debugger;
          for (let i = 0; i < messages.length; i++) {
            if (messages[i].isRead === false && messages[i].reciptionId === currentUserId) {
              this.usersService.markAsRead(currentUserId, messages[i].id)
            }
          }
        }
        )))
      .subscribe((messages: Message[]) => {
        this.messages = messages;
      }, error => {
        this.alertify.error(error);
      });
  }

  sendMessage() {
    this.newMessage.reciptionId = this.recipentId;
    this.usersService.sendMessage(this.authService.tokenDecoded.nameid, this.newMessage).subscribe((message: Message) => {
      debugger;
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    })
  }

}
