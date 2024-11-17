import { Component, OnInit } from '@angular/core';
import { VehicleEntity } from '../../model/vehicle.entity';
import { UserEntity } from '../../../../iam/model/user.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesApiService } from '../../services/vehicles-api.service';

@Component({
  selector: 'app-vehicle-carrier',
  templateUrl: './vehicle-carrier.component.html',
  styleUrls: ['./vehicle-carrier.component.css']
})
export class VehicleCarrierComponent implements OnInit {
  vehicles: VehicleEntity[] = [];
  user: UserEntity = {} as UserEntity;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehiclesApi: VehiclesApiService
  ) {
    this.user.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.user.id !== null && this.user.id !== undefined) {
      this.getVehicles(this.user.id);
    } else {
      console.error('User ID is null or undefined.');
      // Puedes manejar el error aquí, como mostrar un mensaje de error al usuario.
    }
  }


  getVehicles(userId: number): void {
    this.vehiclesApi.getAllVehicles().subscribe(
      (vehicles: VehicleEntity[]) => {
        this.vehicles = vehicles.filter(vehicle => vehicle.userId === userId);
        console.log('Vehicles:', this.vehicles);
      },
      (error: any) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }
}
