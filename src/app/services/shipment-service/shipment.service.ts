import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiBaseUrl } from 'src/app/consts/urls';
import { CreateShipmentDTO } from 'src/app/models/DTOs/Shipment/createShipmentDTO';
import { UpdateShipmentDTO } from 'src/app/models/DTOs/Shipment/updateShipmentDTO';


@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  private apiBaseUrl = apiBaseUrl;
  updateShipmentEmailComplete = new EventEmitter();


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

  putShipment(token: string, id: number, shipment: UpdateShipmentDTO): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    
    return this.http.put<any>(`${this.apiBaseUrl}/api/Shipments/${id}`, shipment, { headers });
  }

  postShipment(token: string, shipment: CreateShipmentDTO): Observable<any>{
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    
    return this.http.post<any>(`${this.apiBaseUrl}/api/Shipments/add`, shipment, { headers });
  }

  updateShipmentsByUserEmail(token: string, userUid: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const url = `${this.apiBaseUrl}/api/Shipments/updatebyuseremail?userUid=${userUid}`;

    return this.http.put<any>(url, null, { headers });
  }

  


}
