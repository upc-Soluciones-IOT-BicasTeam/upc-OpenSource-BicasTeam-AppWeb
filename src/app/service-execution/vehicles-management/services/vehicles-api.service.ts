import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { VehicleEntity } from '../model/vehicle.entity';

@Injectable({
  providedIn: 'root'
})
export class VehiclesApiService {
  // Datos mock estáticos de vehículos
  /*private mockVehicles: VehicleEntity[] = [
    {
      id: 1,
      userId: 1,
      licensePlate: 'ABC-123',
      model: 'Toyota Corolla',
      engine: 95,
      fuel: 78,
      tires: 80,
      electricalSystem: 90,
      transmissionTemperature: 72,
      driverName: 'Juan Pérez',
      vehicleImage: 'https://example.com/toyota.jpg',
      color: 'Rojo',
      lastTechnicalInspectionDate: '2023-10-15',
      createdAt: '2023-01-10',
      currentTemperature: 28.5,
      cabinTemperature: 89.7,
      humidity: 45,
      latitude : -12.046373,
      longitude: -77.042754,
      altitude: 105
    },
    {
      id: 2,
      userId: 1,
      licensePlate: 'XYZ-789',
      model: 'Ford Transit',
      engine: 88,
      fuel: 65,
      tires: 75,
      electricalSystem: 85,
      transmissionTemperature: 68,
      driverName: 'María Gómez',
      vehicleImage: null,
      color: 'Blanco',
      lastTechnicalInspectionDate: '2023-09-20',
      createdAt: '2023-02-05',
      currentTemperature: 31.2,
      cabinTemperature: 92.1,
      humidity: 38,
      latitude : -12.056873,
      longitude: -77.030214,
      altitude: 98
    },
    {
      id: 3,
      userId: 2,
      licensePlate: 'DEF-456',
      model: 'Volkswagen Golf',
      engine: 92,
      fuel: 50,
      tires: 70,
      electricalSystem: 88,
      transmissionTemperature: 75,
      driverName: 'Carlos Ruiz',
      vehicleImage: 'https://example.com/golf.jpg',
      color: 'Azul',
      lastTechnicalInspectionDate: '2023-11-30',
      createdAt: '2023-03-15',
      currentTemperature: 14.2,
      cabinTemperature: 35.1,
      humidity: 38,
      latitude : -12.853214,
      longitude: -77.987532,
      altitude: 60
    }
  ];
*/
  private baseUrl = 'https://app-241114092351funda.azurewebsites.net/api/vehicles';

  constructor(private http: HttpClient) {}

  // Obtener todos los vehículos
  getAllVehicles(): Observable<VehicleEntity[]> {
     return this.http.get<VehicleEntity[]>(`${this.baseUrl}`);
    // Obtener todos los vehículos (mock)
    //return of(this.mockVehicles);
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
