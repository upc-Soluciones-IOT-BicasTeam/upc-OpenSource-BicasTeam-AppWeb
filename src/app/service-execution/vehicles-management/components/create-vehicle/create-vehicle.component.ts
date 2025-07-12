import { Component } from '@angular/core';
import { VehicleEntity } from '../../model/vehicle.entity';
import { VehiclesApiService } from '../../services/vehicles-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css'],
})
export class CreateVehicleComponent {
  vehicle: VehicleEntity = new VehicleEntity();
  uploadedImageUrl: string | null = null;

  constructor(
    private vehiclesApi: VehiclesApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
    vehicleData.vehicleImage = null;

    if (vehicleData.lastTechnicalInspectionDate) {
      vehicleData.lastTechnicalInspectionDate = new Date(
        vehicleData.lastTechnicalInspectionDate
      ).toISOString();
    }

    this.vehiclesApi.addVehicle(vehicleData).subscribe(
      () => {
        const userId = this.route.snapshot.paramMap.get('id');
        if (userId) {
          this.router.navigate(['/vehicles-businessman', userId]);
        } else {
          this.router.navigate(['/vehicles-businessman']);
        }
      },
      (error) => {
        console.error('Error al agregar vehículo:', error);
      }
    );
  }

  cancel(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.router.navigate(['/vehicles-businessman', userId]);
    } else {
      this.router.navigate(['/vehicles-businessman']);
    }
  }
}
