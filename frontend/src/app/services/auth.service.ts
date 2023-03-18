import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  [x: string]: any;

  constructor(private http: HttpClient) { }

  isLoggedIn() {

    //get token from local storage
    const token = localStorage.getItem('auth-token');

     if (token) {
      const payload = atob(token.split('.')[1]);
      // decode payload of token

      // convert payload into an Object
      const parsedPayload = JSON.parse(payload);
      
     return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    }else{
        return null;
    }
  }
  
  getUser(){
     //get token from local storage
     const user = JSON.parse(localStorage.getItem('user') || '{}');
    // console.log("usert",user);
    
     return user?user:false;
  }

  isAdmin(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if(user.role=="ADMIN"){
      return true;
    }
    return false;
  }

  isLecture(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if(user.role=="LECTURE"){
      return true;
    }
    return false;
  }

  isStudent(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if(user.role=="STUDENT"){
      return true;
    }
    return false;

  }
}
