import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  isLoading : boolean = false;
  message  = '';
  private authStateSub: Subscription;
  private messageSub: Subscription;

  constructor(public   authService: AuthService ) { }
  
  ngOnInit() {
    this.authStateSub =  this.authService.getAuthStatusListner()
    .subscribe(authStatus => {
        this.isLoading = false;});

      this.messageSub = this.authService.getMessageRespnse()
      .subscribe(msg => {this.message = msg;})
  }
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.logIn(  form.value.email,  form.value.password)  
  }

  ngOnDestroy(): void {
    this.authStateSub.unsubscribe();
    this.messageSub.unsubscribe();
  }
}
