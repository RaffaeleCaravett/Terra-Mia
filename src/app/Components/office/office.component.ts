import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit{

loginForm!:FormGroup
logged!:boolean
user:any
constructor(private authService:AuthService,private router:Router){}

ngOnInit(): void {
  this.logged=false;
  this.loginForm=new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })

  if(localStorage.getItem('accessToken')&&localStorage.getItem('refreshToken')&&localStorage.getItem('route')){
   this.authService.verifyToken(localStorage.getItem('accessToken')!).subscribe((data:any)=>{
this.user=data
this.authService.isUserAuthenticate(true)
this.logged=true
   },err=>{
    this.authService.isUserAuthenticate(false)
    this.authService.verifyRefreshToken(localStorage.getItem('refreshToken')!).subscribe((dat:any)=>{
      this.user=dat
this.authService.isUserAuthenticate(true)
this.logged=true
    })
   })
  }
}

login(){
  if (this.loginForm.valid){
    this.authService.loginRequest({email:this.loginForm.controls['email'].value,password:this.loginForm.controls['password'].value}).
    subscribe((data:any)=>{
this.authService.setToken(data.tokens.accessToken)
this.authService.setRefreshToken(data.tokens.refreshToken)
localStorage.setItem('accessToken',data.tokens.accessToken)
localStorage.setItem('refreshToken',data.tokens.refreshToken)
localStorage.setItem('route','/office')
this.logged=true
    },err=>{
      console.log(err)
    })
  }
}


}
