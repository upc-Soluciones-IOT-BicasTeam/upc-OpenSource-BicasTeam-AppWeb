import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsApiService {
  private baseURL = 'https://movigestion.azurewebsites.net';

  constructor(private http: HttpClient) { }

  findUserByID(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/users?id=${id}`);
  }

  getAllReports(): Observable<any> {
    return this.http.get(`${this.baseURL}/reports`);
  }
  getReportsById(id:any){
    return this.http.get(`${this.baseURL}/reports?idUser=${id}`);
  }
}
