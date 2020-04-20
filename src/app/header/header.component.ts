import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
   userIsAuthenticated = false;
  private authStatusSub : Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    //because its run befor app component :p
    this.userIsAuthenticated =  this.authService.getIsAuth();
    
    this.authStatusSub =  this.authService.getAuthStatusListner().subscribe(authStatus => {
    this.userIsAuthenticated = authStatus;
    });
  }

  onLogOut() {
    this.authService.logOut()
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
