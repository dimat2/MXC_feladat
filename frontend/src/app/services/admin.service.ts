import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Felhasznalok, Jogok } from '../models/objects';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminPath = environment.apiUrl + "admin/GetList";

  private userPath = environment.apiUrl + "admin/GetUsers";
  private rolePath = environment.apiUrl + "admin/GetRoles";

  constructor(private http: HttpClient) { }

  listaz(): Observable<Array<Felhasznalok>> {
    return this.http.get<Array<Felhasznalok>>(this.adminPath);
  }

  users(): Observable<Array<Felhasznalok>> {
    return this.http.get<Array<Felhasznalok>>(this.userPath);
  }

  roles(): Observable<Array<Jogok>> {
    return this.http.get<Array<Jogok>>(this.rolePath);
  }

  torles(userName, roleName) {
    return this.http.delete(this.adminPath + "/" + userName + "/" + roleName);
  }
}
