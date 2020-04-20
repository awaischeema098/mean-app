import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";

const BACKEND_URL = environment.ApiUlr ;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token : string ;
  private tokenTimer : any;
  isAuthenticated =  false;
  userId: string;
  userName: string;
  private authStatusLisner = new Subject<boolean>(); 
  private messageRespnse = new Subject<string>(); 


constructor(private http: HttpClient, 
            private router: Router) { }

  getAuthStatusListner() {
    return this.authStatusLisner.asObservable();
  }
  getMessageRespnse() {
    return this.messageRespnse.asObservable();
  }
  
  getIsAuth() {
    return this.isAuthenticated;
  }
   
  getUserId() {
    return this.userId;
  }
  getUserName() {
    return this.userName;
  }
  getToken() {
    return this.token;
  }

  creatUser( name: string, email: string, password: string) {
    const authData:  AuthData = { name, email, password};
    return this.http.post( BACKEND_URL+"/sigup", authData)
    .subscribe( result => {
      this.router.navigate(['/']);
    } , error => {
      this.authStatusLisner.next(false);
    })
  }
  
  logIn( email: string, password: string) {
    const authData:  AuthData = { name:null , email: email, password: password};
    
    this.http
    .post<{token: string, expiresIn: number, userId: string, name: string, message: string}>(BACKEND_URL+"/login", authData)
    .subscribe(response => {
      const getToken = response.token;
      this.token = getToken;
      if (getToken) {
        const expiresInDuration = response.expiresIn;
        this.isAuthenticated = true;
        this.authStatusLisner.next(true);
        this.messageRespnse.next(response.message)
        this.userId = response.userId;
        this.userName = response.name;        
        this.setAuthTime(expiresInDuration);
        const now = new Date();
        const expiration = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(getToken, expiration, this.userId, this.userName);
        this.router.navigate(['/']);
      }
    }, (error) => {
      this.authStatusLisner.next(false);
    });  
  }
  
  autoLogIn() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expiration.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.userName = authInformation.userName;
      this.isAuthenticated = true;
      this.setAuthTime(expiresIn / 1000);
      this.authStatusLisner.next(true);
    }
  }

  logOut () {
    this.isAuthenticated = false;
    this.authStatusLisner.next(false);
    this.token = null;
    this.userId = null;

    clearTimeout(this.tokenTimer);
    //clear data from local storage
    this.deleteAuthData()
    this.router.navigate(['/']);
  }
 
  private setAuthTime(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut()
      //multiplay form saconds to miliSecond 
    }, duration * 1000);
  }

  //for private Stroge 
  private saveAuthData(token: string, expiration: Date, userId: string, userName: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", this.userName);
    localStorage.setItem("expiration", expiration.toISOString());
  }
  //for private Stroge 
  private deleteAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

  }
  
  //for private Stroge 
  
  private getAuthData() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const expiration = localStorage.getItem("expiration");
    if (!token || !expiration) {
      return 
    }
    return {
      token: token,
      userId: userId,
      userName: userName,
      expiration: new Date(expiration)
    }
  }
  
  //account Active 
  activeAccount(token) {
     const params = `/active?token=`+token;
     console.log(params);
     
    this.http.get(BACKEND_URL+params )
    .subscribe( result => {
      console.log(result);

    },
    error => {
      console.log(error);
      
    })
  }
}
