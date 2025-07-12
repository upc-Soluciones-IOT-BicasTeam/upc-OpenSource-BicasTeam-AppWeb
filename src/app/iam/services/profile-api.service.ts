import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserEntity } from '../model/user.entity';
import { ProfileEntity } from '../model/profile.entity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileApiService {
  private baseUrl = environment.apiBaseUrl + 'api/v1/profiles';

  constructor(private http: HttpClient) {}

  // Crear un nuevo profile
  createUser(user: ProfileEntity): Observable<ProfileEntity> {
    return this.http.post<ProfileEntity>(`${this.baseUrl}`, user);
  }

  // Encontrar un profile por ID
  findUserById(idCredential: number): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.baseUrl}/${idCredential}`);
  }

  // Eliminar un profile por ID
  deleteProfile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllProfiles() {
    return this.http.get<ProfileEntity>(`${this.baseUrl}`);
  }


}
