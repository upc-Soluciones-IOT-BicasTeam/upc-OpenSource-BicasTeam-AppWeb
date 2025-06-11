import { Component } from '@angular/core';
import {VehicleEntity} from "../../model/vehicle.entity";
import {VehiclesApiService} from "../../services/vehicles-api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-vehicle-update',
  templateUrl: './vehicle-update.component.html',
  styleUrl: './vehicle-update.component.css'
})
export class VehicleUpdateComponent {
  vehicle: VehicleEntity = new VehicleEntity();
  uploadedImageUrl: string | null = null;
  vehicleId: number | null = null;

  constructor(private vehiclesApi: VehiclesApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.vehicleId = +idParam;
        this.loadVehicleData(this.vehicleId);
      } else {
        console.error('No vehicle ID found in route parameters.');
        this.router.navigate(['/vehicles-businessman']);
      }
    });
  }

  loadVehicleData(id: number): void {
    this.vehiclesApi.getVehicleById(id).subscribe(
      (data: VehicleEntity) => {
        this.vehicle = data;

        if (this.vehicle.lastTechnicalInspectionDate && this.vehicle.lastTechnicalInspectionDate.includes('T')) {
          this.vehicle.lastTechnicalInspectionDate = this.vehicle.lastTechnicalInspectionDate.split('T')[0];
        }

        if (this.vehicle.vehicleImage) {
          this.uploadedImageUrl = this.vehicle.vehicleImage;
        }
      },
      error => {
        console.error('Error al cargar datos del vehículo:', error);
        this.router.navigate(['/vehicles-businessman']);
      }
    );
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImageUrl = reader.result as string;
        this.vehicle.vehicleImage = this.uploadedImageUrl;
      };
      reader.readAsDataURL(file);
    }
  }

  updateVehicle(): void {
    const vehicleData = { ...this.vehicle };

    if (vehicleData.lastTechnicalInspectionDate) {
      vehicleData.lastTechnicalInspectionDate = new Date(vehicleData.lastTechnicalInspectionDate).toISOString();
    }

    this.vehiclesApi.updateVehicle(this.vehicle.id, vehicleData).subscribe(
      (data: VehicleEntity) => {
        console.log('Vehículo actualizado exitosamente:', data);
        this.router.navigate([':id/vehicles-businessman']);
      },
      error => {
        console.error('Error al actualizar vehículo:', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate([':id/vehicles-businessman']);
  }
}
