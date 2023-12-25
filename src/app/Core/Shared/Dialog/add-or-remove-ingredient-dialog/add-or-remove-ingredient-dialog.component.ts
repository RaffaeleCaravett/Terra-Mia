import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { IngredientsService } from 'src/app/Services/Ingredients.service';

@Component({
  selector: 'app-add-or-remove-ingredient-dialog',
  templateUrl: './add-or-remove-ingredient-dialog.component.html',
  styleUrls: ['./add-or-remove-ingredient-dialog.component.scss']
})
export class AddOrRemoveIngredientDialogComponent {
  ingredients:any[]=[]
  menu: any;
menu1: any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog :MatDialog,
    private ingredientsService:IngredientsService
  ) { }

  closeDialog(): void {
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {
this.ingredientsService.getAll().subscribe((ingredients:any)=>{
  this.ingredients=ingredients.content
})
}

addToProductIngredients(p:any){
this.data.ingredients.push(p)
if(p.nome=='bufala'){
  this.data.price +=2
}else if (p.nome=='burrata'){
  this.data.price+=3.5
}else if(p.nome=='olio'||p.nome=='basilico'){
this.data.price+=0
}else{
  this.data.price+=1
}
console.log(this.data.price)
}
removeFromProductIngredients(p:any){
this.data.ingredients=this.removeItemById(this.data.ingredients,p)
if(p.nome=='bufala'){
  this.data.price -=2
}else if (p.nome=='burrata'){
  this.data.price-=3.5
}else if(p.nome=='olio'||p.nome=='basilico'){
this.data.price+=0
}else{
  this.data.price-=1
}
console.log(this.data.price)
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
closeD(){
  this.dialogRef.close()
}
}
