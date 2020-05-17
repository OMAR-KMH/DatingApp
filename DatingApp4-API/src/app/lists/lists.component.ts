import { UsersService } from 'src/app/_services/users.service';
import { Pagination, PaginationResult } from './../_models/Pagination';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../_services/alertify.service';
import { User } from './../_models/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users: User[];
  likeParams: string;
  pagination: Pagination
  constructor(private alertify: AlertifyService, private route: ActivatedRoute ,private userService :UsersService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likeParams ="Likers"
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {

    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage,null,this.likeParams)
      .subscribe((res: PaginationResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      }
      );
  }

}
