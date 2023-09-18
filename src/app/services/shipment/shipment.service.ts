import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiBaseUrl } from 'src/app/consts/urls';
import { ReadShipmentDTO } from 'src/app/models/DTOs/Shipment/readShipmentDTO';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private readonly http: HttpClient) { }

  getShipments(token: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${apiBaseUrl}/api/Shipments`, { headers });
  }
}
