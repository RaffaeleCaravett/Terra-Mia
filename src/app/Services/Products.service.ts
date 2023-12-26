import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Core/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpModule:HttpClient) { }



   private products = "/product"
   private modifiedProducts = "/modifiedProduct"


  save(body:{}){
    return this.httpModule.post(environment.API_URL+this.products,body)
  }
  getAll(){
    return this.httpModule.get(`${environment.API_URL}${this.products}?page=0&size=50&sort=true&orderBy=nome`)
  }
getById(id:number){
  return this.httpModule.get(environment.API_URL+this.products+`${id}`)
}
updateById(id:number,body:{}){
  return this.httpModule.put(environment.API_URL+this.products+`${id}`,body)
}
deleteById(id:number){
  return this.httpModule.delete(environment.API_URL+this.products+`${id}`)
}
saveModifiedProduct(body:{}){
  return this.httpModule.post(environment.API_URL+this.modifiedProducts+'/save',body)
}
}
