import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleEntity } from '../model/vehicle.entity';

@Injectable({
  providedIn: 'root'
})
export class VehiclesApiService {
  private baseUrl = 'https://upc-iot-2956-bicasteam-movigestion.proxy.beeceptor.com/api/vehicles';

  constructor(private http: HttpClient) {}

  // Obtener todos los vehículos
  getAllVehicles(): Observable<VehicleEntity[]> {
    return this.http.get<VehicleEntity[]>(`${this.baseUrl}`);
  }

  // Obtener un vehículo por ID
  getVehicleById(id: number): Observable<VehicleEntity> {
    return this.http.get<VehicleEntity>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo vehículo
  addVehicle(vehicle: VehicleEntity): Observable<VehicleEntity> {
    return this.http.post<VehicleEntity>(`${this.baseUrl}`, vehicle);
  }

  // Actualizar un vehículo
  updateVehicle(id: number, vehicle: VehicleEntity): Observable<VehicleEntity> {
    return this.http.put<VehicleEntity>(`${this.baseUrl}/${id}`, vehicle);
  }

  // Eliminar un vehículo por ID
  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
