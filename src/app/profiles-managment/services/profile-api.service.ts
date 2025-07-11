import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Activity, Condition, Delivery } from '../model/profile.entity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileApiService {
  private reportsUrl = environment.apiBaseUrl + 'api/v1/reports';
  private vehiclesUrl = environment.apiBaseUrl + 'api/v1/vehicles';
  private shipmentsUrl = environment.apiBaseUrl + 'api/v1/shipments';

  constructor(private http: HttpClient) {}

  getAllActivities(): Observable<Activity[]> {
    return this.http
      .get<Activity[]>(this.reportsUrl)
      .pipe(catchError(this.handleError));
  }

  getAllConditions(): Observable<Condition[]> {
    return this.http
      .get<Condition[]>(this.vehiclesUrl)
      .pipe(catchError(this.handleError));
  }

  getAllDeliveries(): Observable<Delivery[]> {
    return this.http
      .get<Delivery[]>(this.shipmentsUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something went wrong. Please try again later.')
    );
  }
}
