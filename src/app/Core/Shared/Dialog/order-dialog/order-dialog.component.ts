import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddOrRemoveIngredientDialogComponent } from '../add-or-remove-ingredient-dialog/add-or-remove-ingredient-dialog.component';
import { ProductsService } from 'src/app/Services/Products.service';
import { OrderService } from 'src/app/Services/Order.service';
import { cloneDeep } from 'lodash';


@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit{
insertOrder!:FormGroup
itemsAdded:any[]=[]
entryAdded:any[]=[]
drinkAdded:any[]=[]
menu: any;
menu1: any;
foodArray:any[]=[]
drinkArray:any[]=[]
optionArray:any[]=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog :MatDialog,
    private productService:ProductsService,
private orderService:OrderService
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    for(let i of this.data.products.content){
      if(i.productType!='BIBITE'&&i.productType!='VINI'&&i.productType!='COPERTO'&&i.productType!="PER_CONCLUDERE"){
        this.foodArray.push(i)
      }else if(i.productType=='BIBITE'||i.productType=='VINI'||i.productType=="PER_CONCLUDERE"){
this.drinkArray.push(i)
      }
    }
this.insertOrder=new FormGroup({
coperti: new FormControl(null,Validators.required),
tavolo: new FormControl(null,Validators.required)
})
  }


  addToFood(food:any){
if(food.productType!='SPECIALITÀ'&&food.productType!='FRITTI'){
  this.itemsAdded.push(food)
}else{
  this.entryAdded.push(food)
}
  }
  addToDrink(drink:any){
this.drinkAdded.push(drink)
  }
  remove(item:any){
    if (
      item.productType !== 'SPECIALITÀ' &&
      item.productType !== 'FRITTI' &&
      item.productType !== 'BIBITE' &&
      item.productType !== 'VINI' &&
      item.productType !== 'COPERTO' &&
      item.productType !== 'PER_CONCLUDERE'
    ) {
      this.itemsAdded = this.removeItemById(this.itemsAdded, item);
    } else if (
      item.productType !== 'PIZZE_CLASSICHE' &&
      item.productType !== 'PIZZE_FOOD_PORN' &&
      item.productType !== 'BIBITE' &&
      item.productType !== 'VINI' &&
      item.productType !== 'COPERTO' &&
      item.productType !== 'PER_CONCLUDERE'
    ) {
      this.entryAdded = this.removeItemById(this.entryAdded, item);
    } else {
      this.drinkAdded = this.removeItemById(this.drinkAdded, item);
    }
  }
  modify(item:any){
    const updatedItem = cloneDeep(item);
     const addOrRemoveDialog = this.dialog.open(AddOrRemoveIngredientDialogComponent,{data:updatedItem})
   addOrRemoveDialog.afterClosed().subscribe((closed:any)=>{if(closed){
 const updatedItem = closed ;
 if (
  item.productType !== 'SPECIALITÀ' &&
  item.productType !== 'FRITTI' &&
  item.productType !== 'BIBITE' &&
  item.productType !== 'VINI' &&
  item.productType !== 'COPERTO' &&
  item.productType !== 'PER_CONCLUDERE'
) {
  this.itemsAdded.push(updatedItem)
} else if (
  item.productType !== 'PIZZE_CLASSICHE' &&
  item.productType !== 'PIZZE_FOOD_PORN' &&
  item.productType !== 'BIBITE' &&
  item.productType !== 'VINI' &&
  item.productType !== 'COPERTO' &&
  item.productType !== 'PER_CONCLUDERE'
) {
  this.entryAdded.push(updatedItem)
} else {
  this.drinkAdded.push(updatedItem)
}
this.remove(item)
   }
   })
  }

  removeItemById(array: any[], itemToRemove: any): any[] {
    let removed = false;
    return array.filter(item => {
      if (!removed && item.id === itemToRemove.id) {
        removed = true;
        return false;
      }
      return true;
    });
  }


  sendOrder(): void {
if(this.insertOrder.valid){
  let modifiedP:any[]=[]
for(let p of this.itemsAdded){
  let ingredients:any[]=[];
  for(let i of p.ingredients){
    ingredients.push(i.id)
  }
  this.productService.saveModifiedProduct(
    {nome:p.nome,
productType:p.productType,
price:p.price,
ingredients:ingredients,
requests:p.requests
    }
    ).subscribe((p:any)=>{
modifiedP.push(p.id)
    })

}
for(let d of this.drinkAdded){
  this.productService.saveModifiedProduct(
    {nome:d.nome,
productType:d.productType,
price:d.price,
ingredients:[],
requests:d.requests
    }
    ).subscribe((p:any)=>{
modifiedP.push(p.id)
    })
}
for(let e of this.entryAdded){
  this.productService.saveModifiedProduct(
    {nome:e.nome,
productType:e.productType,
price:e.price,
ingredients:[],
requests:e.requests
    }
    ).subscribe((p:any)=>{
modifiedP.push(p.id)
    })
}
setTimeout(()=>{
this.orderService.save(
  {
    coperti:this.insertOrder.controls['coperti'].value,
    products:modifiedP,
    user:1,
    state:"IN_CORSO",
    tavolo:String(this.insertOrder.controls['tavolo'].value)
  }
  ).subscribe((data:any)=>{
    this.dialogRef.close();
    location.reload();
  })
},4000)
}
  }


// updateQuantity(item: any, quantity: string ,select:any) {
//  let originalPrice= item.price/item.description||item.price/1
//  console.log(item.productType)
//   const updatedItem = { ...item };
// if(item.description!=undefined){
//   if(select.value>item.description){
// for(let i =item.description||1 ;i<=select.value;i++){
// if(i<select.value){
//   updatedItem.price+=originalPrice
// }
// }
//   }else if(select.value<item.description){
//     for(let i=item.description||1 ;i>=select.value;i--){
// if(i>select.value){
//   updatedItem.price-=originalPrice
// }
//     }
//   }else{
//     updatedItem.price=item.price
//   }
// }else{
//   if(select.value>1){
// for(let i =item.description||1 ;i<=select.value;i++){
// if(i<select.value){
//   updatedItem.price+=originalPrice
// }
// }
//   }else if(select.value<1){
//     for(let i=item.description||1 ;i>=select.value;i--){
// if(i>select.value){
//   updatedItem.price-=originalPrice
// }
//     }
//   }else{
//     updatedItem.price=item.price
//   }
// }

//   updatedItem.description = quantity;
//   if (
//     item.productType !== 'SPECIALITÀ' &&
//     item.productType !== 'FRITTI' &&
//     item.productType !== 'BIBITE' &&
//     item.productType !== 'VINI' &&
//     item.productType !== 'COPERTO' &&
//     item.productType !== 'PER_CONCLUDERE'
//   ) {
//     this.itemsAdded.push(updatedItem)
//   } else if (
//     item.productType !== 'PIZZE_CLASSICHE' &&
//     item.productType !== 'PIZZE_FOOD_PORN' &&
//     item.productType !== 'BIBITE' &&
//     item.productType !== 'VINI' &&
//     item.productType !== 'COPERTO' &&
//     item.productType !== 'PER_CONCLUDERE'
//   ) {
//     this.entryAdded.push(updatedItem)
//   } else {
//     this.drinkAdded.push(updatedItem)
//   }
// this.remove(item)
// }

}
