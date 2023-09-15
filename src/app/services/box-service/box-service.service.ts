import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiBaseUrl } from 'src/app/consts/urls';

@Injectable({
  providedIn: 'root'
})
export class BoxServiceService {

  private apiBaseUrl = apiBaseUrl;

  constructor(private http: HttpClient) { }

  getBoxData(token: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiBaseUrl}/api/Boxes`, { headers });
  }
}
