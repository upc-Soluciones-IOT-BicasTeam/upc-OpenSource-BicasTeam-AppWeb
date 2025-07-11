// src/app/services/shipment-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShipmentEntity } from '../model/shipment.entity';
import { BaseService } from '../../../shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ShipmentApiService extends BaseService<ShipmentEntity> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = 'api/v1/shipments';
  }

  getAllShipments(): Observable<ShipmentEntity[]> {
    return this.getAll();
  }

  getShipmentsByUserId(userId: number): Observable<ShipmentEntity[]> {
    return this.http.get<ShipmentEntity[]>(
      `${this.resourcePath()}?idUser=${userId}`
    );
  }

  getShipmentById(id: number): Observable<ShipmentEntity> {
    return this.getById(id);
  }

  addShipment(shipment: Partial<ShipmentEntity>): Observable<ShipmentEntity> {
    return this.http.post<ShipmentEntity>(this.resourcePath(), shipment);
  }

  updateShipment(
    id: number,
    shipment: Partial<ShipmentEntity>
  ): Observable<ShipmentEntity> {
    return this.http.put<ShipmentEntity>(
      `${this.resourcePath()}/${id}`,
      shipment
    );
  }

  deleteShipment(id: number): Observable<void> {
    return this.delete(id);
  }
}
