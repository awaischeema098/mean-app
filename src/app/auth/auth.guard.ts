import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard  implements CanActivate{
    constructor(private authService: AuthService, private router: Router) {}
    
    canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean | Observable<boolean> | Promise<boolean> {
        // throw new Error("Method not implemented.");
        const auth = this.authService.getIsAuth()
        if (!auth) {
            this.router.navigate(['/login']);
        }
        return auth
    }
}