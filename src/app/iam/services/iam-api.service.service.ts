import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserEntity } from '../model/user.entity';

@Injectable({
  providedIn: 'root'
})
export class IamApiService {
  private baseUrl = 'https://app-241114092351funda.azurewebsites.net/api/profiles';

  constructor(private http: HttpClient) {}

  // Encontrar un usuario por email y password
  findUserWithEmailAndPassword(email: string, password: string): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.baseUrl}/email/${email}/password/${password}`);
  }

  // Encontrar un usuario por email
  findUserWithEmail(email: string): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.baseUrl}/email/${email}`);
  }

  // Crear un nuevo usuario
  createUser(user: UserEntity): Observable<UserEntity> {
    return this.http.post<UserEntity>(`${this.baseUrl}`, user);
  }

  // Encontrar un usuario por ID
  findUserById(id: number): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.baseUrl}/${id}`);
  }

  // Actualizar un usuario por email y password (ajustado según tu API)
  updateUser(email: string, password: string, user: Partial<UserEntity>): Observable<UserEntity> {
    return this.http.put<UserEntity>(`${this.baseUrl}/email/${email}/password/${password}`, user);
  }

  // Eliminar un usuario por ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
