import { Component, ViewChild, ElementRef } from '@angular/core';
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
  isSubmitting = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private vehiclesApi: VehiclesApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Por favor seleccione un archivo de imagen válido.');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo es muy grande. Por favor seleccione una imagen menor a 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addVehicle(): void {
    if (this.isSubmitting) return;

    // Basic validation
    if (!this.vehicle.licensePlate || !this.vehicle.model || !this.vehicle.color) {
      alert('Por favor complete todos los campos requeridos.');
      return;
    }

    this.isSubmitting = true;
    const vehicleData = { ...this.vehicle };
    
    // Set the uploaded image
    vehicleData.vehicleImage = this.uploadedImageUrl;

    // Process the inspection date
    if (vehicleData.lastTechnicalInspectionDate) {
      try {
        const date = new Date(vehicleData.lastTechnicalInspectionDate);
        if (!isNaN(date.getTime())) {
          vehicleData.lastTechnicalInspectionDate = date.toISOString();
        } else {
          vehicleData.lastTechnicalInspectionDate = null;
        }
      } catch (e) {
        console.error('Error processing inspection date:', e);
        vehicleData.lastTechnicalInspectionDate = null;
      }
    }

    this.vehiclesApi.addVehicle(vehicleData).subscribe(
      (response) => {
        console.log('Vehículo agregado exitosamente:', response);
        this.navigateBack();
      },
      (error) => {
        console.error('Error al agregar vehículo:', error);
        alert('Error al agregar el vehículo. Por favor intente nuevamente.');
        this.isSubmitting = false;
      }
    );
  }

  cancel(): void {
    this.navigateBack();
  }

  private navigateBack(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.router.navigate(['/vehicles-businessman', userId]);
    } else {
      this.router.navigate(['/vehicles-businessman']);
    }
  }
}
