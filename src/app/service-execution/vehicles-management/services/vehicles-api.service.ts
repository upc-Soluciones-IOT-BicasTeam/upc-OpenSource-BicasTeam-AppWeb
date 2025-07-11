import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleEntity } from '../model/vehicle.entity';
import { BaseService } from '../../../shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class VehiclesApiService extends BaseService<VehicleEntity> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = 'api/v1/vehicles';
  }

  // Obtener todos los vehículos
  getAllVehicles(): Observable<VehicleEntity[]> {
    return this.getAll();
  }

  // Obtener un vehículo por ID
  getVehicleById(id: number): Observable<VehicleEntity> {
    return this.getById(id);
  }

  // Crear un nuevo vehículo
  addVehicle(vehicle: VehicleEntity): Observable<VehicleEntity> {
    return this.create(vehicle);
  }

  // Actualizar un vehículo
  updateVehicle(id: number, vehicle: VehicleEntity): Observable<VehicleEntity> {
    return this.update(id, vehicle);
  }

  // Eliminar un vehículo por ID
  deleteVehicle(id: number): Observable<void> {
    return this.delete(id);
  }
}
