import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShipmentEntity } from "../model/shipment.entity";

@Injectable({
  providedIn: 'root'
})
export class ShipmentApiService {
  private baseUrl = 'https://app-241114092351funda.azurewebsites.net/api/shipments';

  constructor(private http: HttpClient) {}

  // Obtener todos los envíos
  getAllShipments(): Observable<ShipmentEntity[]> {
    return this.http.get<ShipmentEntity[]>(`${this.baseUrl}`);
  }

  // Obtener un envío por su ID
  getShipmentById(id: number): Observable<ShipmentEntity> {
    return this.http.get<ShipmentEntity>(`${this.baseUrl}/${id}`);
  }

  // Agregar un nuevo envío
  addShipment(shipment: Partial<ShipmentEntity>): Observable<ShipmentEntity> {
    return this.http.post<ShipmentEntity>(`${this.baseUrl}`, shipment);
  }

  // Eliminar un envío por su ID
  deleteShipment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Obtener envíos por ID de usuario (función personalizada)
  getShipmentsByUserId(userId: number): Observable<ShipmentEntity[]> {
    return this.http.get<ShipmentEntity[]>(`${this.baseUrl}?idUser=${userId}`);
  }
}
