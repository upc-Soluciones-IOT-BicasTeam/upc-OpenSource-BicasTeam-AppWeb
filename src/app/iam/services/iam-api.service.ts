import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserEntity } from '../model/user.entity';
import { BaseService } from '../../shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class IamApiService extends BaseService<UserEntity> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = 'api/v1/users';
  }

  // Autenticar al usuario con email y password
  authenticateUser(email: string, password: string): Observable<UserEntity> {
    return this.http.get<UserEntity>(
      `${this.resourcePath()}/email/${email}/password/${password}`
    );
  }

  // Encontrar un usuario por email
  findUserWithEmail(email: string): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.resourcePath()}/email/${email}`);
  }

  // Crear un nuevo usuario
  createUser(user: UserEntity): Observable<UserEntity> {
    return this.create(user);
  }

  // Encontrar un usuario por ID
  findUserById(id: number): Observable<UserEntity> {
    return this.getById(id);
  }

  // Actualizar un usuario usando email y password
  updateUser(
    email: string,
    password: string,
    userUpdates: Partial<UserEntity>
  ): Observable<UserEntity> {
    const url = `${this.resourcePath()}/email/${email}/password/${password}`;
    return this.http.put<UserEntity>(url, userUpdates);
  }

  // Obtener todos los usuarios
  getAllUsers(): Observable<UserEntity[]> {
    return this.getAll();
  }

  // Eliminar un usuario por ID
  deleteUser(id: number): Observable<void> {
    return this.delete(id);
  }
}
