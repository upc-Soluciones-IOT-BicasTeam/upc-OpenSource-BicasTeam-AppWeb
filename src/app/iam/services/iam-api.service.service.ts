import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserEntity } from '../model/user.entity';

@Injectable({
  providedIn: 'root'
})
export class IamApiService {
  private baseUrl = 'https://ca9a3dc74ff83e275c7c.free.beeceptor.com/api/users';

  constructor(private http: HttpClient) {}

  // Autenticar al usuario con email y password
  authenticateUser(email: string, password: string): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.baseUrl}?email=${email}&password="${password}"`);
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
