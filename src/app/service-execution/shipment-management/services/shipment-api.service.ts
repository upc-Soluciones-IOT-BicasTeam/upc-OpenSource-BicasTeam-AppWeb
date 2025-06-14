// src/app/services/shipment-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShipmentEntity } from '../model/shipment.entity';

@Injectable({
  providedIn: 'root'
})
export class ShipmentApiService {
  private baseUrl = 'http://localhost:8080/api/shipments';

  constructor(private http: HttpClient) {}

  getAllShipments(): Observable<ShipmentEntity[]> {
    return this.http.get<ShipmentEntity[]>(`${this.baseUrl}`);

  }

  getShipmentsByUserId(userId: number): Observable<ShipmentEntity[]> {
    return this.http.get<ShipmentEntity[]>(`${this.baseUrl}?idUser=${userId}`);
  }

  getShipmentById(id: number): Observable<ShipmentEntity> {
    return this.http.get<ShipmentEntity>(`${this.baseUrl}/${id}`);
  }

  addShipment(shipment: Partial<ShipmentEntity>): Observable<ShipmentEntity> {
    return this.http.post<ShipmentEntity>(this.baseUrl, shipment);
  }

  updateShipment(id: number, shipment: Partial<ShipmentEntity>): Observable<ShipmentEntity> {
    return this.http.put<ShipmentEntity>(`${this.baseUrl}/${id}`, shipment);
  }

  deleteShipment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
