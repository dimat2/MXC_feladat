import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Esemeny } from '../models/objects';

@Injectable({
  providedIn: 'root'
})
export class EsemenyService {

  private esemenyPath = environment.apiUrl + "esemeny";

  constructor(private http: HttpClient) { }

  letrehoz(data): Observable<any> {
    return this.http.post(this.esemenyPath, data, {responseType: 'text'});
  }

  listaz(): Observable<Array<Esemeny>> {
    return this.http.get<Array<Esemeny>>(this.esemenyPath);
  }

  lista(id): Observable<Esemeny> {
    return this.http.get<Esemeny>(this.esemenyPath + "/" + id);
  }

  torles(id) {
    return this.http.delete(this.esemenyPath + "/" + id);
  }

  frissit(data) {
    return this.http.put(this.esemenyPath, data);
  }
}
