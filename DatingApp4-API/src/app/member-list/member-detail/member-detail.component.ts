import { AlertifyService } from './../../_services/alertify.service';
import { User } from './../../_models/User';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_services/users.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private userservice: UsersService, private alertify: AlertifyService
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // console.log(data['user']);
      this.user = data['user'];
    });
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }];
    this.galleryImages = this.getImages();

  }


  getImages(){
    const imageUrls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description:this.user.photos[i].description

      });
    }
    return imageUrls;
  }
  // loadUser() {

  //   this.userservice.getUser(this.route.snapshot.params['id']).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
