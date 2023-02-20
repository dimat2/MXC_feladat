import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginPath = environment.apiUrl + "identity/login";
  private registerPath = environment.apiUrl + "identity/register";
  
  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    return this.http.post(this.loginPath, data, {responseType: 'text'});
  }

  register(data): Observable<any> {
    return this.http.post(this.registerPath, data);
  }

  saveToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false
    var obj = JSON.parse(window.atob(this.getToken().split('.')[1]));
    var userRole = obj.role;
    console.log(userRole, ", ", allowedRoles);
    allowedRoles.forEach(element => {
      if (userRole == element) {      
        isMatch =  true;
      }
    });
    return isMatch;
  }
}
