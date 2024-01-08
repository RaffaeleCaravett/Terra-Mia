import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BillComponent } from 'src/app/Core/Shared/Dialog/bill/bill.component';
import { ConfirmDeleteComponent } from 'src/app/Core/Shared/Dialog/confirm-delete/confirm-delete.component';
import { ModifyOrderComponent } from 'src/app/Core/Shared/Dialog/modify-order/modify-order.component';
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
  ordersPerYear:any[]=[]
  ordersPerMonth:any[]=[]
  ordersPerDay:any[]=[]
  productsPerYear:any[]=[]
  productsPerMonth:any[]=[]
  productsPerDay:any[]=[]
  earningsPerYear:number=0
  earningsPerMonth:number=0
  earningsPerDay:number=0
  sala:boolean=false
  pizzeria:boolean=false
  productsArray:any[]=[]
  ingredientsArray:any[]=[]
constructor(private orderService:OrderService, private ingredientsService:IngredientsService, private productService:ProductsService,private matDialog:MatDialog){

}
  ngOnInit(): void {
    let date = new Date();
   this.ordersPerYear=[]
 this.ordersPerMonth=[]
 this.ordersPerDay=[]
 this.productsPerYear=[]
 this.productsPerMonth=[]
 this.productsPerDay=[]
 this.earningsPerYear=0
 this.earningsPerMonth=0
 this.earningsPerDay=0
    this.orderService.getOrderByYear(date.getFullYear()).subscribe((year:any)=>{
      this.ordersPerYear=year
      for(let i=0;i<year.length;i++){
        for(let p of year[i].prodotti){
        this.productsPerYear.push(p)
      }
      this.earningsPerYear+=Number(year[i].totale)
    }
    })
    this.orderService.getOrderByYearAndMonth(date.getFullYear(),date.getMonth()+1).subscribe((month:any)=>{
      this.ordersPerMonth=month
      for(let i=0;i<month.length;i++){
      for(let p of month[i].prodotti){
        this.productsPerMonth.push(p)
      }
      this.earningsPerMonth+=Number(month[i].totale)
    }
    })
    this.orderService.getOrderByYearAndMonthAndDay(date.getFullYear(),date.getMonth()+1,date.getDate()).subscribe((day:any)=>{
      this.ordersPerDay=day
      for(let i=0;i<day.length;i++){
      for(let p of day[i].prodotti){
        this.productsPerDay.push(p)
      }
      this.earningsPerDay+=Number(day[i].totale)
    }
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
modify(o:any){
  const dialogRef=this.matDialog.open(ModifyOrderComponent,{data:o})
}
cancel(id:number){
  const dialogRef =this.matDialog.open(ConfirmDeleteComponent)
dialogRef.afterClosed().subscribe((result:any)=>{
  if(result=='yes'){
this.orderService.deleteOrder(id).subscribe((data:any)=>{
  this.ngOnInit()
  window.alert('L\'ordine '+  id +' è stato cancellato correttamente');
})
  }else{
      window.alert('L\'ordine non è stato cancellato');
  }
})
}
}
