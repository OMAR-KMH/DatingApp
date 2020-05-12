import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { environment } from './../../../environments/environment';
import { Photo } from './../../_models/Photo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UsersService } from 'src/app/_services/users.service';
import { Console } from '@angular/core/src/console';


@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit {

  baseUrl = environment.apiUrl;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  currentPhoto: Photo;

  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  constructor(private authService: AuthService, private usersService: UsersService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {

    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.tokenDecoded.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      // method:'post',
      //isHTML5:true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1204 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
        console.log(photo);
        console.log(response);
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.usersService.setMainPhoto(this.authService.tokenDecoded.nameid, photo.id).subscribe(() => {
      // console.log("Successful SetMain photo is Done ");
      this.currentPhoto = this.photos.filter(p => p.isMain === true)[0]
      console.log(this.currentPhoto);
      this.currentPhoto.isMain = false;
      photo.isMain = true;
      this.authService.changeMemberPhoto(photo.url);
      // this.getMemberPhotoChange.emit(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error => {
      this.alertify.error(error);
    })
  }


  deletePhoto(id: number) {
    this.alertify.confirm("Are you sure tofrom delete Photo ? ", () => {
      this.usersService.deletePhoto(this.authService.tokenDecoded.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id == id), 1);
        this.alertify.success("Success Delete Photo");
      }, error => {
        this.alertify.error(error);
      })
    })
  }

}
