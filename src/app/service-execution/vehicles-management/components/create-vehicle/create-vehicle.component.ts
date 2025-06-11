import { Component } from '@angular/core';
import { VehicleEntity } from '../../model/vehicle.entity';
import { VehiclesApiService } from '../../services/vehicles-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent {
  vehicle: VehicleEntity = new VehicleEntity();
  uploadedImageUrl: string | null = null;

  constructor(private vehiclesApi: VehiclesApiService, private router: Router) {}

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addVehicle(): void {
    const vehicleData = { ...this.vehicle };
    vehicleData.vehicleImage = undefined;

    if (vehicleData.lastTechnicalInspectionDate) {
      vehicleData.lastTechnicalInspectionDate = new Date(vehicleData.lastTechnicalInspectionDate).toISOString();
    }

    this.vehiclesApi.addVehicle(vehicleData).subscribe(
      () => {
        this.router.navigate([':id/vehicles-businessman']);
      },
      error => {
        console.error('Error al agregar vehículo:', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate([':id/vehicles-businessman']);
  }
}
