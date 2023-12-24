import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Core/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private order = '/order'

  constructor(private http:HttpClient) { }

getAllOrder(){
  return this.http.get(environment.API_URL+this.order)
}

getOrderByYear(year:number){
  return this.http.get(environment.API_URL+this.order+`/byYear?year=${year}`)
}
getOrderByYearAndMonth(year:number,month:number){
  return this.http.get(environment.API_URL+this.order+`/byYearAndMonth?year=${year}&month=${month}`)
}
getOrderByYearAndMonthAndDay(year:number,month:number,day:number){
  return this.http.get(environment.API_URL+this.order+`/byDate?year=${year}&month=${month}&day=${day}`)
}
}
