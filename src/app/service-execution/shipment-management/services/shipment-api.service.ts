import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShipmentApiService {
  baseUrl="https://movigestion.azurewebsites.net"
  constructor(private http:HttpClient) { }

  getAllShipments(){
    return this.http.get(`${this.baseUrl}/shipments`)
  }
  addShipment(shipment:any){
    return this.http.post(`${this.baseUrl}/shipments`,shipment)
  }
  deleteShipment(id:any){
    return this.http.delete(`${this.baseUrl}/shipments?id=${id}`);
  }
  getShipmentsByIdOfUser(id:any){
    return this.http.get(`${this.baseUrl}/shipments?idUser=${id}`)
  }
}
