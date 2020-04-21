import { error } from 'protractor';
import { AuthService } from './../../_services/auth.service';
import { UsersService } from 'src/app/_services/users.service';
import { User } from './../../_models/User';
import { ActivatedRoute, Resolve } from '@angular/router';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  useredit: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty)
      $event.returnValue = true;
  };

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userSerivce: UsersService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.useredit = data['useredit'];
    });
  }
  updateUser() {

    this.userSerivce.updateUser(this.authService.tokenDecoded.nameid, this.useredit)
      .subscribe(data => {
        this.editForm.reset(this.useredit);
        this.alertify.success("updated is Successfly");
      }, error => {
        this.alertify.error(error);
      }
      )
  }
}
