import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BaseUrl = environment.production? environment.backend +'/auth/login' : environment.devbaseUrl+'/auth/login';
  
  constructor(private http: HttpClient) { }

  login(data: any){
    return this.http.post(this.BaseUrl,data);
  }

}
