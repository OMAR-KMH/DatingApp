import { Router } from '@angular/router';
import { User } from './../_models/User';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { error } from 'protractor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm : FormGroup;
  bsConfig : Partial<BsDatepickerConfig>;
  constructor(private authService: AuthService, private alertify: AlertifyService, private rout:Router,
    private fb:FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass : 'theme-blue'
    };
      this.createRigisterForm();

       // this.registerForm = new FormGroup({
      //   username : new FormControl("" ,Validators.required),
      //   password : new FormControl("",[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
      //   confirmPassword :new FormControl("",Validators.required)
      // },this.passwordMachValidetor);
  }

  createRigisterForm(){
    this.registerForm = this.fb.group({
      gender : ['male'],
      username  : ['',Validators.required],
      knownAs :['',Validators.required],
      dateOfBirth : [null,Validators.required],
      city :['',Validators.required],
      country :['',Validators.required],
      password : ['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword : ['',Validators.required]
    },{validators:this.passwordMachValidetor});
  }

    passwordMachValidetor(g:FormGroup){
      var password = g.get('password').value,
          confimePassword = g.get('confirmPassword').value;
          return password === confimePassword? null : {'mismatch' : true} ;

    }
  register() {

    this.user= Object.assign({},this.registerForm.value);


    this.authService.register(this.user).subscribe(() => {
      this.alertify.success("Successfuly Registeration");
    },error => {
      this.alertify.error(error)
    } , () =>{
      this.authService.Login(this.user).subscribe( () =>{
        this.rout.navigate(['/members'])
      });
    });



    // this.authService.register(this.model).subscribe(next => {
    //   this.alertify.message('Register is Successful.......');
    // }, error => {
    //   this.alertify.error(error);
    // });

    console.log(this.registerForm.value);
  }

  cancel() {

    this.cancelRegister.emit(false);
    console.log('Cancel.......');

  }


}
