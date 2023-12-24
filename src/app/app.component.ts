import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'terra_mia';
  constructor(private router:Router ){
  }
  ngOnInit(): void {
if(localStorage.getItem('accessToken')&&localStorage.getItem('refreshToken')&&localStorage.getItem('route')){
  this.router.navigate(['/office'])
}
}
}
