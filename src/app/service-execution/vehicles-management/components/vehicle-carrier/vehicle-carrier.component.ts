import { Component, OnInit } from '@angular/core';
import { VehicleEntity } from '../../model/vehicle.entity';
import { UserEntity } from '../../../../iam/model/user.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesApiService } from '../../services/vehicles-api.service';
import { IamApiService } from '../../../../iam/services/iam-api.service.service';

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
    private vehiclesApi: VehiclesApiService,
    private iamApiService: IamApiService // Inyecta el servicio de usuario
  ) {}

  ngOnInit(): void {
    // Supongamos que el ID del usuario se pasa como parámetro de ruta.
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.getUserDetails(userId);
    } else {
      console.error('User ID is null or undefined.');
    }
  }

  getUserDetails(userId: number): void {
    this.iamApiService.findUserById(userId).subscribe(
      (user: UserEntity) => {
        this.user = user;
        console.log('User data:', this.user);
        this.getVehicles(); // Llama a getVehicles después de obtener el nombre del usuario
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  getVehicles(): void {
    this.vehiclesApi.getAllVehicles().subscribe(
      (vehicles: VehicleEntity[]) => {
        // Filtra los vehículos cuyo `driverName` coincide con el `name` del usuario
        this.vehicles = vehicles.filter(vehicle => vehicle.driverName === this.user.name);
        console.log('Vehicles for user:', this.user.name, this.vehicles);
      },
      (error: any) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }
}
