import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BillComponent } from 'src/app/Core/Shared/Dialog/bill/bill.component';
import { OrderDialogComponent } from 'src/app/Core/Shared/Dialog/order-dialog/order-dialog.component';
import { IngredientsService } from 'src/app/Services/Ingredients.service';
import { OrderService } from 'src/app/Services/Order.service';
import { ProductsService } from 'src/app/Services/Products.service';

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
  sala:boolean=false
  pizzeria:boolean=false
  productsArray:any[]=[]
  ingredientsArray:any[]=[]
constructor(private orderService:OrderService, private ingredientsService:IngredientsService, private productService:ProductsService,private matDialog:MatDialog){

}
  ngOnInit(): void {
    let date = new Date();
    this.orderService.getOrderByYear(date.getFullYear()).subscribe((year:any)=>{
      this.ordersPerYear=year
      this.productsPerYear=year.products
    })
    this.orderService.getOrderByYearAndMonth(date.getFullYear(),date.getMonth()+1).subscribe((month:any)=>{
      this.ordersPerMonth=month
      this.productsPerMonth=month.products
    })
    this.orderService.getOrderByYearAndMonthAndDay(date.getFullYear(),date.getMonth()+1,date.getDate()).subscribe((day:any)=>{
      this.ordersPerDay=day
      this.productsPerDay=day.products
    })


    this.ingredientsService.getAll().subscribe((ingredients:any)=>{
      this.ingredientsArray=ingredients
    })

    this.productService.getAll().subscribe((products:any)=>{
      this.productsArray = products
    })
  }

inserisciOrdine(){
   const dialog = this.matDialog.open(OrderDialogComponent,{data:{
    products:this.productsArray,
    ingredients:this.ingredientsArray
   }})
    dialog.afterClosed().subscribe((close:any)=>{console.log(close)})
  }

chiudiOrdine(){
const dialog = this.matDialog.open(BillComponent,{data:this.ordersPerDay})
dialog.afterClosed().subscribe((close:any)=>{console.log(close)})
}
paga(order:any){
  let products:any[]=[];
  for (let p of order.prodotti){
    products.push(p.id)
  }
this.orderService.updateOrder(order.id,
  {
coperti:order.coperti,
products:products,
user:1,
state:'PAGATO',
tavolo:order.tavolo
  }
  ).subscribe((data:any)=>{
location.reload()
  })
}
}
