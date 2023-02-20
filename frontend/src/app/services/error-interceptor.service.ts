import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI } from 'ng-block-ui';
import { NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { MyJSONObj } from '../models/objects';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  @BlockUI() blockUI: NgBlockUI;

  constructor(private toastr: ToastrService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        this.blockUI.stop();

        let errorMessage = this.handleError(err);
        return throwError(() => errorMessage);
      })
    );
  }

  private handleError = (error) : string => {
    if(error.status === 404){
      return this.handleNotFound(error);
    }
    else if(error.status === 400){
      return this.handleBadRequest(error);
    }
    else if(error.status === 401){
      this.toastr.error("Hiba a bejelentkezéskor.", "Authentikáció");
      return this.handleUnAuth(error);
    }
    else if(error.status === 403){
      return this.forbidden(error);
    }
  }
  private handleNotFound = (error): string => {
    this.router.navigate(['register']);
    return error.message;
  }
  private handleBadRequest = (error): string => {
    if(this.router.url === '/register'){
        return error.error;
    }
    else {
      return error.error ? error.error : error.message;
    }
  }

  private handleUnAuth = (error): string => {
    if(this.router.url === '/login'){
        return error.error;
    }
    else {
      return error.error ? error.error : error.message;
    }
  }

  private forbidden = (error): string => {
    if(this.router.url === '/szerep'){
      this.toastr.warning("Nincs jogosultságod a művelethez!", "Role manager");
        return error.error;
    }
    else {
      return error.error ? error.error : error.message;
    }
  }
}
