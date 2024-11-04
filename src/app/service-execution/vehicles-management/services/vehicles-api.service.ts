import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VehiclesApiService {
  baseUrl="https://localhost:44391/vehicle"
  constructor(private http:HttpClient) { }
  getVehicleById(id:any){
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  addVehicle(vehicle:any){
    return this.http.post(`${this.baseUrl}`,vehicle);
  }
  deleteVehicle(id:any){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
