import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { VehiclesApiService } from '../../services/vehicles-api.service';
import { VehicleEntity } from '../../model/vehicle.entity';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-vehicle-businessman',
  templateUrl: './vehicle-businessman.component.html',
  styleUrls: ['./vehicle-businessman.component.css']
})
export class VehicleBusinessmanComponent implements OnInit, OnDestroy {
  vehicles: VehicleEntity[] = [];
  selectedVehicle: VehicleEntity | null = null;
  showForm: boolean = false;
  isEditing: boolean = false;
  showDetails: boolean = false;
  vehicle: VehicleEntity = new VehicleEntity();
  uploadedImageUrl: string | null = null;

  @ViewChild('mapContainer') mapContainer: ElementRef | undefined;

  constructor(private vehiclesApi: VehiclesApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  ngOnDestroy(): void {
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

  navigateToDetails(vehicleId: number) {
    console.log('Botón clickeado, ID:', vehicleId);
    this.router.navigate([':id/vehicles-details-businessman', vehicleId]);
  }

  navigateToCreateVehicle() {
    this.router.navigate([':id/create-vehicle-businessman']);
  }

  navigateToUpdateVehicle(vehicleId: number) {
    this.router.navigate([':id/vehicles-update', vehicleId]);
  }

  updateVehicle(vehicle: VehicleEntity): void { // O el nombre de tu método que tiene el error
    const vehicleData: Partial<VehicleEntity> = { ...vehicle };

    // **INICIO DE LA CORRECCIÓN DEL ERROR TS2769**
    if (vehicleData.lastTechnicalInspectionDate) {
      // Solo intenta crear un objeto Date si la propiedad NO es null.
      try {
        // El formato que tu backend aceptó en Postman era ISO (con T y Z)
        // vehicleData.lastTechnicalInspectionDate al venir de un input type="datetime-local" será "YYYY-MM-DDTHH:mm"
        // El .toISOString() lo convertirá a "YYYY-MM-DDTHH:mm:ss.sssZ" que tu backend ya ha demostrado aceptar.
        const date = new Date(vehicleData.lastTechnicalInspectionDate);

        // Verificamos si la fecha es válida después de la creación
        if (!isNaN(date.getTime())) {
          vehicleData.lastTechnicalInspectionDate = date.toISOString(); // Genera el formato ISO que tu backend aceptó
        } else {
          // Si la fecha no es válida (ej. el string no se pudo parsear),
          // asignamos null o un valor por defecto si es necesario.
          console.error('La fecha de inspección técnica no es válida:', vehicleData.lastTechnicalInspectionDate);
          vehicleData.lastTechnicalInspectionDate = null;
        }
      } catch (e) {
        // Captura cualquier error durante la creación del objeto Date
        console.error('Error al procesar lastTechnicalInspectionDate:', e);
        vehicleData.lastTechnicalInspectionDate = null;
      }
    } else {
      // Si vehicleData.lastTechnicalInspectionDate es null (o undefined si no se maneja así),
      // simplemente lo enviamos como null al backend.
      vehicleData.lastTechnicalInspectionDate = null;
    }
    // **FIN DE LA CORRECCIÓN DEL ERROR TS2769**


    // ... (resto de tu lógica, como managerId, etc.)

    this.vehiclesApi.updateVehicle(vehicle.id, vehicleData as VehicleEntity).subscribe(
      (updatedVehicle: VehicleEntity) => {
        console.log('Vehículo actualizado exitosamente:', updatedVehicle);
        // ...
      },
      error => {
        console.error('Error al actualizar vehículo:', error);
        // ...
      }
    );
  }

  closeDetails(): void {
    this.showDetails = false;
    this.selectedVehicle = null;
  }


  deleteVehicle(id: number): void {
     {
      this.vehiclesApi.deleteVehicle(id).subscribe(
        () => {
          this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
        },
      );
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.vehicle = new VehicleEntity();
  }
}
