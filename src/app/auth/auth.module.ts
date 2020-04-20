import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ActivateComponent } from './activate/activate.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        ActivateComponent
    ], 
    imports: [
        CommonModule,
        FormsModule,
        AngularMaterialModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}