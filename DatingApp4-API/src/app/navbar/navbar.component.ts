import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from './../_services/alertify.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model: any = {};
  constructor(public authService: AuthService,private alertify: AlertifyService) { }

  ngOnInit() {
  }


  // Method To Login
  Login() {
    this.authService.Login(this.model).subscribe(next => {
      this.alertify.success('successfuly Login');

    }, error => {
      this.alertify.error(error);
    });
  }

  LoggedIn() {
   return this.authService.LoggedIn();
  }

  Lougout() {
    const token = localStorage.removeItem('token');
      this.alertify.message("Logged out .......");
  }

}
