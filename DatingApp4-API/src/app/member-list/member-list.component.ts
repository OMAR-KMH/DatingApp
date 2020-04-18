import { pipe } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { User } from './../_models/User';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  constructor(private userService: UsersService, private alertify: AlertifyService,
   private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.users =data['users'];
    }
    );
  }

  // loadUsers() {

  //   this.userService.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   }, error => {
  //     this.alertify.error(error);
  //   }
  //   );
  // }

}
