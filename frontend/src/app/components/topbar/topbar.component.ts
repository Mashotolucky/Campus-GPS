import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  user: any;
  isAdmin: any;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = this.authService.isAdmin();
  }

  logout(){
    localStorage.clear();
  }

}
