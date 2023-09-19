import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiBaseUrl } from 'src/app/consts/urls';
import { UpdateUserDTO } from 'src/app/models/DTOs/User/updateUserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiBaseUrl = apiBaseUrl;
  
  constructor(private http: HttpClient) { }

  getUsers(token: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiBaseUrl}/api/Users`, { headers });
  }

  getUserData(token: string, userId: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiBaseUrl}/api/Users/get/${userId}`, { headers });
  }

  getUser(token: string, id: number): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiBaseUrl}/api/Users/${id}`, { headers });
  }

  postUserToDb(token: string): Observable<any> {
    console.log("THIS IS THE TOKEN " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiBaseUrl}/api/Users/add`,"user", { headers });
  }

  putUser(token: string, id: number, user: UpdateUserDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    
    return this.http.put<any>(`${apiBaseUrl}/api/Users/${id}`, user, { headers });
  }

  deleteUser(token: string, id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.delete<any>(`${apiBaseUrl}/api/Users/${id}`, { headers });
  }

  restoreUser(token: string, id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.put<any>(`${apiBaseUrl}/api/Users/restore/${id}`, { headers });
  }

  getAllUsersShipments(token: string, userId: string){
    
  }
}
