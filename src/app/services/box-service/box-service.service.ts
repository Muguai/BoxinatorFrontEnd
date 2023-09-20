import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiBaseUrl } from 'src/app/consts/urls';
import { UpdateBoxDTO } from 'src/app/models/DTOs/Box/updateBoxyDTO';

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

  getBoxById(token: string, id: number): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiBaseUrl}/api/Boxes/${id}`, { headers });
  }

  getShipmentBoxes(token: string, id: number): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiBaseUrl}/api/Boxes/getboxesbyshipment/${id}`, { headers });
  }

  putBox(token: string, id: number, box: UpdateBoxDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    
    return this.http.put<any>(`${this.apiBaseUrl}/api/Boxes/${id}`, box, { headers });
  }
}
