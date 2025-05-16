import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserEntity} from "../model/user.entity";
import {ProfileEntity} from "../model/profile.entity";

@Injectable({
  providedIn: 'root'
})
export class ProfileApiServiceService {

  private baseUrl = 'https://huarzu-miguel.free.beeceptor.com/api/profiles';

  constructor(private http: HttpClient) {}

  // Crear un nuevo usuario
  createUser(user: ProfileEntity): Observable<ProfileEntity> {
    return this.http.post<ProfileEntity>(`${this.baseUrl}`, user);
  }
  // Encontrar un usuario por email
  findUserWithEmail(email: string): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.baseUrl}?email=${email}`);
  }

  // Encontrar un usuario por ID
  findUserById(id: number): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.baseUrl}?idCredentials=${id}`);
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
