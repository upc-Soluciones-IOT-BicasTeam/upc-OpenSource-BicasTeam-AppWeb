import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserEntity} from "../model/user.entity";
import {BaseService} from "../../shared/services/base.service.service";

@Injectable({
  providedIn: 'root'
})
export class IamApiService {
  baseUrl="http://localhost:3000"
  constructor(private http:HttpClient){
  }
  findUserWithEmailAndPassword(email:any,password:any){
    return this.http.get(`${this.baseUrl}/users?email=${email}&password=${password}`)
  }
  findUserWithEmail(email:any){
    return this.http.get(`${this.baseUrl}/users?email=${email}`)
  }
  createUser(jsonUser:any){
    return this.http.post(`${this.baseUrl}/users`,jsonUser)
  }
}
