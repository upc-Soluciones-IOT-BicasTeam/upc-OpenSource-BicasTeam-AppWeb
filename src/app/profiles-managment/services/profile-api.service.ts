import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Activity, Condition, Delivery } from '../model/profile.entity';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  private reportsUrl = 'https://app-241114092351funda.azurewebsites.net/api/reports';
  private vehiclesUrl = 'https://app-241114092351funda.azurewebsites.net/api/vehicles';
  private shipmentsUrl = 'https://app-241114092351funda.azurewebsites.net/api/shipments';

  constructor(private http: HttpClient) {}

  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.reportsUrl).pipe(
      catchError(this.handleError)
    );
  }

  getAllConditions(): Observable<Condition[]> {
    return this.http.get<Condition[]>(this.vehiclesUrl).pipe(
      catchError(this.handleError)
    );
  }

  getAllDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.shipmentsUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
