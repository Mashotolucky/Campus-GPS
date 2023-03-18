import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if(!this.auth.isAdmin() && !this.auth.isLoggedIn()) {
      console.log("Not logged as Admin");
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
