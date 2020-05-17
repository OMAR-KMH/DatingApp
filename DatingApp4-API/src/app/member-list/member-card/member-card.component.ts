import { UsersService } from 'src/app/_services/users.service';
import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { User } from './../../_models/User';
import { Component, OnInit, Input } from '@angular/core';
import { error } from 'protractor';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;
  constructor(private authService: AuthService, private alertify: AlertifyService,
    private usersSerivce: UsersService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.usersSerivce.sendLike(this.authService.tokenDecoded.nameid, id).subscribe(() => {
      this.alertify.success("You have Liked " + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    })
  }

}
