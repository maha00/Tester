import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';  // Import the environment

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {username, password});
  }
  registerUser(userData: { name: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data`);
  }

  updateData(element: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/update_data`, element);
  }

  addData(newData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add_data`, newData);
  }

  deleteData(element: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete_data`, element);
  }
}
