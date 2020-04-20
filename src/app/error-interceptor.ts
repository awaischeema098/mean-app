import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { ErrorComponent } from './error/error.component';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
    [x: string]: any;
    
    constructor(public dialog: MatDialog) {}
   
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            // tap(evt => {
            //     if (evt instanceof HttpResponse) {
            //         let successMessage = "Successfully!!";
            //         if(evt.body )
            
                        
            //     this.dialog.open(ErrorComponent , {data: {message: successMessage}});
            //     return throw(evt)
            // }),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = "Error Occurred!";
                if(error.error.message){
                    errorMessage = error.error.message;
                }
               this.dialog.open(ErrorComponent , {data: {message: errorMessage}});
                return throwError(error)
            })
        );
    }
    
}    