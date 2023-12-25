import { Component, OnInit } from '@angular/core';
import { IngredientsService } from 'src/app/Services/Ingredients.service';
import { OrderService } from 'src/app/Services/Order.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit{
  ordersPerYear:any
  ordersPerMonth:any
  ordersPerDay:any
  productsPerYear:any
  productsPerMonth:any
  productsPerDay:any
constructor(private orderService:OrderService, private ingredientsService:IngredientsService){

}
  ngOnInit(): void {
    let date = new Date();
    this.orderService.getOrderByYear(date.getFullYear()).subscribe((year:any)=>{
      this.ordersPerYear=year
      this.productsPerYear=year.products
    })
    this.orderService.getOrderByYearAndMonth(date.getFullYear(),date.getMonth()).subscribe((month:any)=>{
      this.ordersPerMonth=month
      this.productsPerMonth=month.products
    })
    this.orderService.getOrderByYearAndMonthAndDay(date.getFullYear(),date.getMonth(),date.getDay()).subscribe((day:any)=>{
      this.ordersPerDay=day
      this.productsPerDay=day.products
    })


    this.ingredientsService.getAll().subscribe((ingredients:any)=>{
      console.log(ingredients)
    })
  }

}
