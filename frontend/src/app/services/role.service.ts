import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Szerepkorok } from '../models/objects';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private rolePath = environment.apiUrl + "role";

  constructor(private http: HttpClient) { }

  letrehoz(data): Observable<any> {
    return this.http.post(this.rolePath, data);
  }

  leker(): Observable<Szerepkorok> {
    return this.http.get<Szerepkorok>(this.rolePath);
  }
}
