import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VehiclesApiService {
  baseUrl="https://localhost:44391/profile"
  constructor(private http:HttpClient) { }
  getVehicleById(id:any){
    return this.http.get(`${this.baseUrl}/vehicle/${id}`)
  }
  addVehicle(vehicle:any){
    return this.http.post(`${this.baseUrl}/vehicle`,vehicle);
  }
  deleteVehicle(id:any){
    return this.http.delete(`${this.baseUrl}/vehicle/${id}`);
  }
}
