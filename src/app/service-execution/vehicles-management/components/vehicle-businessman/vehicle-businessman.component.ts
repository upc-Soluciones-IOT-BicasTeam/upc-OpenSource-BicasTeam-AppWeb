import { Component, OnInit } from '@angular/core';
import { VehiclesApiService } from '../../services/vehicles-api.service';
import { VehicleEntity } from '../../model/vehicle.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-businessman',
  templateUrl: './vehicle-businessman.component.html',
  styleUrls: ['./vehicle-businessman.component.css']
})
export class VehicleBusinessmanComponent implements OnInit {
  vehicles: VehicleEntity[] = [];
  selectedVehicle: VehicleEntity | null = null;
  showForm: boolean = false;
  isEditing: boolean = false;
  showDetails: boolean = false;
  vehicle: VehicleEntity = new VehicleEntity();
  uploadedImageUrl: string | null = null;

  constructor(private vehiclesApi: VehiclesApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehiclesApi.getAllVehicles().subscribe(
      (data: VehicleEntity[]) => {
        this.vehicles = data;
      },
      (error) => {
        console.error('Error loading vehicles:', error);
      }
    );
  }

  showAddVehicleForm(): void {
    this.vehicle = new VehicleEntity();
    this.isEditing = false;
    this.showForm = true;
    this.uploadedImageUrl = null;
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImageUrl = reader.result as string; // Base64 string de la imagen solo para mostrar en la vista
      };
      reader.readAsDataURL(file);
    }
  }

  addVehicle(): void {
    // Prepara los datos para enviar, estableciendo `vehicleImage` como `undefined`
    const vehicleData = { ...this.vehicle };
    vehicleData.vehicleImage = undefined; // Esto omite la propiedad al enviarla

    if (vehicleData.lastTechnicalInspectionDate) {
      vehicleData.lastTechnicalInspectionDate = new Date(vehicleData.lastTechnicalInspectionDate).toISOString();
    }

    this.vehiclesApi.addVehicle(vehicleData).subscribe(
      (data: VehicleEntity) => {
        console.log('Vehículo agregado exitosamente:', data);
        // Agregar manualmente la imagen cargada a la lista de vehículos solo en el frontend
        data.vehicleImage = this.uploadedImageUrl;
        this.vehicles.push(data);
        this.showForm = false;
      },
      (error) => {
        console.error('Error al agregar vehículo:', error);
      }
    );
  }

  editVehicle(vehicle: VehicleEntity): void {
    this.vehicle = { ...vehicle }; // Clona el vehículo para evitar modificaciones directas
    this.uploadedImageUrl = vehicle.vehicleImage || null; // Muestra la imagen actual, si existe
    this.isEditing = true;
    this.showForm = true;
  }

  updateVehicle(): void {
    if (this.vehicle.id) {
      const vehicleData = { ...this.vehicle };
      delete vehicleData.vehicleImage;

      vehicleData.lastTechnicalInspectionDate = new Date(vehicleData.lastTechnicalInspectionDate).toISOString();
      this.vehiclesApi.updateVehicle(this.vehicle.id, vehicleData).subscribe(
        (data: VehicleEntity) => {
          console.log('Vehículo actualizado exitosamente:', data);
          this.loadVehicles();
          this.showForm = false;
        },
        (error) => {
          console.error('Error al actualizar vehículo:', error);
        }
      );
    }
  }

  viewVehicleDetails(vehicle: VehicleEntity): void {
    this.selectedVehicle = vehicle;
    this.showDetails = true;
  }

  closeDetails(): void {
    this.showDetails = false;
    this.selectedVehicle = null;
  }

  cancelForm(): void {
    this.showForm = false;
    this.vehicle = new VehicleEntity();
  }
}
