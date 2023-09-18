import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiBaseUrl } from 'src/app/consts/urls';


@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  private apiBaseUrl = apiBaseUrl;

  constructor(private http: HttpClient) { }

  getShipments(token: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${apiBaseUrl}/api/Shipments`, { headers });
  }

  getShipmentHistoryOfUser(token: string, userId: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiBaseUrl}/api/Shipments/getbyuseruid/${userId}`, { headers });
  }


}
