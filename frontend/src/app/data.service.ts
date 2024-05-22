import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post('https://testeraziz-047f20242fc1.herokuapp.com/login', {username, password});
  }

  getData(): Observable<any> {
    return this.http.get<any>('https://testeraziz-047f20242fc1.herokuapp.com/data');
  }

  updateData(element: any): Observable<any> {
    return this.http.post('https://testeraziz-047f20242fc1.herokuapp.com/update_data', element);
  }

  addData(newData: any): Observable<any> {
    return this.http.post(`https://testeraziz-047f20242fc1.herokuapp.com/add_data`, newData);
  }

}

