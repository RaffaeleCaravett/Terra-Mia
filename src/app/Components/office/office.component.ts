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
  localStorage.setItem('route','/office')
  this.logged=false;
  this.loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    password:new FormControl('',Validators.required)
  })

  if(localStorage.getItem('accessToken')&&localStorage.getItem('refreshToken')&&localStorage.getItem('route')){
   this.authService.verifyToken(localStorage.getItem('accessToken')!).subscribe((data:any)=>{
this.user=data
this.authService.isUserAuthenticate(true)
this.router.navigate(['/dashboard'])
   },err=>{
    this.authService.isUserAuthenticate(false)
    this.authService.verifyRefreshToken(localStorage.getItem('refreshToken')!).subscribe((dat:any)=>{
      this.user=dat
this.authService.isUserAuthenticate(true)
this.router.navigate(['/dashboard'])
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
    },err=>{
      console.log(err)
    })
  }
}


}
