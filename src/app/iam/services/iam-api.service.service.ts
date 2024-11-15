import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserEntity} from "../model/user.entity";
import {BaseService} from "../../shared/services/base.service.service";

@Injectable({
  providedIn: 'root'
})
export class IamApiService {
  baseUrl="http://localhost:5102/profile"
  constructor(private http:HttpClient){
  }
  findUserWithEmailAndPassword(email:any,password:any){
    return this.http.get(`${this.baseUrl}/email/${email}/password/${password}`)
  }
  findUserWithEmail(email:any){
    return this.http.get(`${this.baseUrl}/email/${email}`)
  }
  createUser(jsonUser:any){
    return this.http.post(`${this.baseUrl}`,jsonUser)
  }
  findUserById(id:any){
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  updateUser(id:any,jsonUser:JSON){
    return this.http.put(`${this.baseUrl}/users?id=${id}`,jsonUser)
  }
}
