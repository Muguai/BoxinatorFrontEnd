import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiBaseUrl = 'https://boxinator-backend.azurewebsites.net';

  constructor(private http: HttpClient) { }

  getCountries(token: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiBaseUrl}/api/Countries`, { headers });
  }
}
