import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserEntity} from "../../iam/model/user.entity";
import {ImageEntity} from "../model/image.entity";

@Injectable({
  providedIn: 'root'
})
export class SubsApiService {

  private baseUrl = 'https://cab41478f23eef12f275.free.beeceptor.com/api/images';

  constructor(private http: HttpClient) {}
//*******
  uploadImage(image: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, image);
  }

  // Encontrar un usuario por ID
  findUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Actualizar un usuario usando email y password
  updateUser(email: string, password: string, userUpdates: Partial<UserEntity>): Observable<UserEntity> {
    const url = `${this.baseUrl}/email/${email}/password/${password}`;
    return this.http.put<UserEntity>(url, userUpdates);
  }

  // Eliminar un usuario por ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
