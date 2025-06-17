import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserEntity} from "../../iam/model/user.entity";
import {SubsData} from "../model/image.entity";

@Injectable({
  providedIn: 'root'
})
export class SubsApiService {

  private baseUrl = 'http://localhost:8080/api/subscriptions';

  constructor(private http: HttpClient) {}
//*******
  uploadImage(image: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, image);
  }


  updateStatus(id: number, newState: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, { state: newState });
  }

  getAll(): Observable<SubsData[]> {
    return this.http.get<SubsData[]>(`${this.baseUrl}`);
  }
}
