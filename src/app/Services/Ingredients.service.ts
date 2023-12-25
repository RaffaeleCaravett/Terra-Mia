import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../Core/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private httpModule:HttpClient) { }



   private ingredients = "/ingredients"


  save(body:{}){
    return this.httpModule.post(environment.API_URL+this.ingredients,body)
  }
  getAll(){
    return this.httpModule.get(`${environment.API_URL}${this.ingredients}?page=0&size=40&sort=true&orderBy=nome`)
  }
getById(id:number){
  return this.httpModule.get(environment.API_URL+this.ingredients+`${id}`)
}
updateById(id:number,body:{}){
  return this.httpModule.put(environment.API_URL+this.ingredients+`${id}`,body)
}
deleteById(id:number){
  return this.httpModule.delete(environment.API_URL+this.ingredients+`${id}`)
}
}
