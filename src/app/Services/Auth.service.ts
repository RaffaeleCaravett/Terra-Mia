import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../Core/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpModule:HttpClient) { }

  private _token: string | null = null;
  private _refreshToken: string | null = null;

   user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

   private signup = "/auth/register"
   private login = "/auth/login"
   private verifyTkn = "/auth/"
   private userPath = "/user/"
   private isAuthenticated = false;

  get token(): string | null {
    return this._token;
  }
  get refreshToken(): string | null {
    return this._refreshToken;
  }
  setToken(token: string): void {
    this._token = token;
  }
  setRefreshToken(refreshToken: string): void {
    this._refreshToken = refreshToken;
  }
  updateUserDatas(user: any) {
    this.user.next(user);
  }

signupRequest(body:{}){
return this.httpModule.post(environment.API_URL+this.signup,body)
}

loginRequest(body:{}){
  return this.httpModule.post(environment.API_URL+this.login,body)
  }

  verifyToken(token:string){
    return this.httpModule.get(environment.API_URL+this.verifyTkn+token)
  }

  verifyRefreshToken(refreshToken:string){
    return this.httpModule.get(environment.API_URL+this.verifyTkn+'refreshToken/'+refreshToken)
  }

  updateUser(id:number,body:{}){
    return this.httpModule.put(environment.API_URL+this.userPath+id,body)
  }

  isUserAuthenticate(bool?:boolean){
    if(bool){
      return this.isAuthenticated=bool
    }else{
      return this.isAuthenticated
    }
  }
}
