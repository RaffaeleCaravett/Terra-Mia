import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddOrRemoveIngredientDialogComponent } from '../add-or-remove-ingredient-dialog/add-or-remove-ingredient-dialog.component';
import { ProductsService } from 'src/app/Services/Products.service';
import { OrderService } from 'src/app/Services/Order.service';

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
   const addOrRemoveDialog = this.dialog.open(AddOrRemoveIngredientDialogComponent,{data:item})
   addOrRemoveDialog.afterClosed().subscribe((closed:any)=>{if(closed){
 item=closed
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
for(let d of this.drinkAdded){
  modifiedP.push(d.id)
}
for(let e of this.entryAdded){
  modifiedP.push(e.id)
}
setTimeout(()=>{
  console.log(modifiedP)
this.orderService.save(
  {
    coperti:this.insertOrder.controls['coperti'].value,
    products:modifiedP,
    user:1,
    state:"IN_CORSO",
    tavolo:String(this.insertOrder.controls['tavolo'].value)
  }
  ).subscribe((data:any)=>{
    console.log(data)
    this.dialogRef.close();
  })
},3000)


}
}
  }

}
