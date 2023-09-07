import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiBaseUrl = 'http://localhost:5236'; 
  private apiBaseUrl2 = 'http://localhost:5177'; 
  


  constructor(private http: HttpClient, private auth:AuthenticationService) { }

  getWeatherData(token: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiBaseUrl}/WeatherForecast`, { headers });
  }

  addUser(token: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiBaseUrl2}/api/Users/add`,token, { headers });
  }

  getBoxData(token: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiBaseUrl2}/api/Boxes`, { headers });
  }
}