import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/Services/Order.service';

@Component({
  selector: 'app-modify-order',
  templateUrl: './modify-order.component.html',
  styleUrls: ['./modify-order.component.scss']
})
export class ModifyOrderComponent implements OnInit{
  modifyForm!:FormGroup
  prodotti:any[]=[]
  constructor(
    public dialogRef: MatDialogRef<ModifyOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService:OrderService
  ) { }
  ngOnInit(): void {
this.modifyForm= new FormGroup({
  coperti:new FormControl(this.data.coperti),
  totale:new FormControl(this.data.totale),
  tavolo:new FormControl(this.data.tavolo),
  modify:new FormControl(this.data.modify)
})
this.prodotti=this.data.prodotti
 }
 modify(): void {
  let prodottiIds=[]
  for(let p of this.prodotti){
    prodottiIds.push(p.id)
  }
this.orderService.updateOrder(this.data.id,
  {
    coperti:this.modifyForm.controls['coperti'].value,
    products:prodottiIds,
    user:1,
    state:this.data.state,
    tavolo:String(this.modifyForm.controls['tavolo'].value),
    modify:this.modifyForm.controls['modify'].value,
    totale:this.modifyForm.controls['totale'].value,
  }).subscribe((data:any)=>{
      this.dialogRef.close('modify');
  })
}
no(){
this.dialogRef.close();
}
removeFromProducts(p:any){
 this.prodotti=this.removeItemById(this.prodotti,p)
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
}
