import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {

  constructor(private http: HttpClient) { }

  getAllActivities(): Observable<any> {
    return this.http.get('http://localhost:5102/report');
  }

  getAllCondition(): Observable<any> {
    return this.http.get('http://localhost:5102/vehicle');
  }

  getAllDeliveries(): Observable<any> {
    return this.http.get('http://localhost:5102/shipment');
  }
}
