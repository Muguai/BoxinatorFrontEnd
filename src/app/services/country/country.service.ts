import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiBaseUrl } from 'src/app/consts/urls';
import { UpdateCountryDTO } from 'src/app/models/DTOs/Country/updateCountryDTO';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries(token: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${apiBaseUrl}/api/Countries`, { headers });
  }

  getCountriesExcludingScandinavia(token: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${apiBaseUrl}/api/Countries/GetCountriesExceptScandinavia`, { headers });
  }

  getCountry(token: string, id: number): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${apiBaseUrl}/api/Countries/${id}`, { headers });
  }

  putScandinavia(token: string, scandinavia: UpdateCountryDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    
    return this.http.put<any>(`${apiBaseUrl}/api/Countries/updatescandinavia/1`, scandinavia, { headers });
  }

  putCountry(token: string, id: number, country: UpdateCountryDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    
    return this.http.put<any>(`${apiBaseUrl}/api/Countries/${id}`, country, { headers });
  }
}
