import { AlertifyService } from './../_services/alertify.service';
import { error } from 'protractor';
import { PaginationResult } from './../_models/Pagination';
import { AuthService } from './../_services/auth.service';
import { UsersService } from 'src/app/_services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../_models/Pagination';
import { Message } from '../_models/Message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = "Unread";

  constructor(private route: ActivatedRoute, private usersSevice: UsersService
    , private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
    console.log(this.messages);
  }

  loadMessages() {
    this.usersSevice.getMessages(this.authService.tokenDecoded.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage, this.messageContainer).subscribe((res: PaginationResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      })
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.alertify.confirm("Are you sure for Deleting Message ??",() =>
    this.usersSevice.deleteMessage(id,this.authService.tokenDecoded.nameid).subscribe(()=>{
        this.messages.splice(this.messages.findIndex(m => m.id ==id));
        this.loadMessages();
        this.alertify.success(" Message has  been deleted ")
    },error =>{
      this.alertify.error("Falied  to Deleted Message")
    })
    );

  }
}
