import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    @Inject(MAT_DIALOG_DATA) public data: any
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
coperti: new FormControl(0,Validators.required),
tavolo: new FormControl(0,Validators.required)
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
  modify(item:any){}

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
}
