import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private profilPath = environment.apiUrl + "profil/SavePictures";
  private loadPath = environment.apiUrl + "profil/LoadPictures";

  constructor(private http: HttpClient) { }

  profil(kep) {
    return this.http.post(this.profilPath, kep);
  }

  profilKi(): Observable<any> {
    return this.http.post(this.loadPath, null)
  }
}
