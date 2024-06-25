import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {

  constructor(private http: HttpClient) { }

  getAllActivities(): Observable<any> {
    return this.http.get('https://movigestion.azurewebsites.net/reports');
  }

  getAllCondition(): Observable<any> {
    return this.http.get('https://movigestion.azurewebsites.net/vehicles');
  }

  getAllDeliveries(): Observable<any> {
    return this.http.get('https://movigestion.azurewebsites.net/shipments');
  }
}
