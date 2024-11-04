
import { Component } from '@angular/core';
import {VehicleEntity} from "../../model/vehicle.entity";
import {UserEntity} from "../../../../iam/model/user.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {VehiclesApiService} from "../../services/vehicles-api.service";
import {IamApiService} from "../../../../iam/services/iam-api.service.service";

@Component({
  selector: 'app-vehicle-carrier',
  templateUrl: './vehicle-carrier.component.html',
  styleUrl: './vehicle-carrier.component.css'
})
export class VehicleCarrierComponent {
  vehicles: any[] = [];
  vehiclesId:any[] = [];
  vehicle: VehicleEntity = {} as VehicleEntity;
  user: UserEntity = {} as UserEntity;

  constructor(private route: ActivatedRoute, private router: Router,private vehiclesApi: VehiclesApiService, private iamApi: IamApiService) {
    this.user.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getVehicles(this.user.id);
  }

  async getVehicles(userId: string) {
    this.vehiclesApi.getVehicleById(userId).subscribe((data:any)=>{
      console.log(data)
      this.vehicles.push(data);
    })
  }


}
