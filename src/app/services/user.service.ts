import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiBaseUrl = 'http://localhost:5177';
  
  constructor(private http: HttpClient) { }

  getUserData(token: string, userId: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiBaseUrl}/api/Users/get/${userId}`, { headers });
  }

  postUserToDb(token: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiBaseUrl}/api/Users/add`,"user", { headers });
  }

  putUser(token: string, userId: number, user: any): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    
    return this.http.put<any>(`${this.apiBaseUrl}/api/Users/${userId}`, user, { headers });
  }
}
