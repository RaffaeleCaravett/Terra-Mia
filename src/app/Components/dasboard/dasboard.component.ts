import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/Order.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit{


constructor(private orderService:OrderService){

}
  ngOnInit(): void {
    let date = new Date();
    this.orderService.getOrderByYear(date.getFullYear()).subscribe((year:any)=>{
      console.log(year)
    })
    this.orderService.getOrderByYearAndMonth(date.getFullYear(),date.getMonth()).subscribe((month:any)=>{
      console.log(month)
    })
    this.orderService.getOrderByYearAndMonthAndDay(date.getFullYear(),date.getMonth(),date.getDay()).subscribe((year:any)=>{
      console.log(year)
    })
  }

}
