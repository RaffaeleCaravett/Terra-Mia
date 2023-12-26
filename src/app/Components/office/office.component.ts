import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/Core/Shared/Dialog/dialog/dialog.component';
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
constructor(private authService:AuthService,private router:Router,private dialog:MatDialog){}

ngOnInit(): void {
  localStorage.setItem('route','/office')
  this.logged=false;
  this.loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    password:new FormControl('',Validators.required)
  })

  if(localStorage.getItem('accessToken')&&localStorage.getItem('refreshToken')&&localStorage.getItem('route')){
   this.authService.verifyToken(localStorage.getItem('accessToken')!).subscribe((data:any)=>{
    this.authService.setToken(localStorage.getItem('accessToken')!)
    this.authService.setRefreshToken(localStorage.getItem('refreshToken')!)
this.user=data
this.authService.isUserAuthenticate(true)
this.router.navigate(['/dashboard'])
   },err=>{
    this.authService.isUserAuthenticate(false)
    this.authService.verifyRefreshToken(localStorage.getItem('refreshToken')!).subscribe((dat:any)=>{
      localStorage.setItem('accessToken',dat.accessToken)
      localStorage.setItem('refreshToken',dat.refreshToken)
this.authService.setToken(dat.accessToken)
this.authService.isUserAuthenticate(true)
this.router.navigate(['/dashboard'])
// const dialog = this.dialog.open(DialogComponent,
// {
// data:err.message
// })
// dialog.afterClosed().subscribe((close:any)=>{console.log(close)})
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
this.authService.isUserAuthenticate(true)
this.router.navigate(['/dashboard'])
    },err=>{
const dialogRef = this.dialog.open(DialogComponent,{data:err.error.message})
dialogRef.afterClosed().subscribe((data:any)=>{
  console.log(data)
})
})

  }
}


}
