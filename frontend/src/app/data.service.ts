import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:5000/login', {username, password});
  }

  getData(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/data');
  }

  updateData(element: any): Observable<any> {
    return this.http.post('http://localhost:5000/update_data', element);
  }

  addData(newData: any): Observable<any> {
    return this.http.post(`http://localhost:5000/add_data`, newData);
  }

}

