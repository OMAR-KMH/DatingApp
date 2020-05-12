import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from './../_services/alertify.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model: any = {};
  photoUrl:string;
  constructor(public authService: AuthService,private alertify: AlertifyService,
    private router:Router) { }

  ngOnInit() {

    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);

  }


  // Method To Login
  Login() {
    this.authService.Login(this.model).subscribe(next => {
      this.alertify.success('successfuly Login');
      this.router.navigate(['/members'])
    }, error => {
      this.alertify.error(error);
    });
  }

  LoggedIn() {
   return this.authService.LoggedIn();
  }

  Lougout() {
     localStorage.removeItem('token');
     localStorage.getItem('user');
     this.authService.tokenDecoded=null;
     this.authService.currentUser=null;
      this.alertify.message("Logged out .......");
      this.router.navigate(['/home']);
  }

}
