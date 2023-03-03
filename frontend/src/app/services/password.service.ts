import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private passwordPath = environment.apiUrl + "password/MailSend";
  private verifyPath = environment.apiUrl + "password/VerifyReset";
  private updatePath = environment.apiUrl + "password/UpdatePassword";

  @BlockUI() blockUI: NgBlockUI;

  constructor(private httpClient: HttpClient) { }

  kuld(email) {
   return this.httpClient.post(this.passwordPath, email)
  }

  ellenoriz(data): Observable<any> {
    return this.httpClient.post(this.verifyPath, data)
  }

  createNew(data) {
    return this.httpClient.post(this.updatePath, data);
  }

}
