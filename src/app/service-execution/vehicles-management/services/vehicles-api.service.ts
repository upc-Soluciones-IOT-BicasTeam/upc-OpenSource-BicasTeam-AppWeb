import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VehiclesApiService {
  baseUrl="https://movigestion.azurewebsites.net"
  constructor(private http:HttpClient) { }
  getVehicleById(id:any){
    return this.http.get(`${this.baseUrl}/vehicles?id=${id}`)
  }
  addVehicle(vehicle:any){
    return this.http.post(`${this.baseUrl}/vehicles`,vehicle);
  }
  deleteVehicle(id:any){
    return this.http.delete(`${this.baseUrl}/vehiclesy?id=${id}`);
  }
}
