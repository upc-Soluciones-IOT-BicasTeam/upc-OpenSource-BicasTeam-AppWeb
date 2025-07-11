import { environment } from '../../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, retry, throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  protected basePath: string = environment.apiBaseUrl;
  protected resourceEndpoint: string = '';
  protected httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };

  constructor(public http: HttpClient) {}

  protected handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was:`,
        error.error
      );
    }
    return throwError(
      () => new Error('Something happened with request, please try again later')
    );
  };

  protected resourcePath(): string {
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  // Get all resources
  getAll(): Observable<T[]> {
    return this.http
      .get<T[]>(this.resourcePath())
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get resource by ID
  getById(id: number): Observable<T> {
    return this.http
      .get<T>(`${this.resourcePath()}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Create new resource
  create(item: T): Observable<T> {
    return this.http
      .post<T>(this.resourcePath(), item, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update resource
  update(id: number, item: Partial<T>): Observable<T> {
    return this.http
      .put<T>(`${this.resourcePath()}/${id}`, item, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Delete resource
  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.resourcePath()}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
