import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { VehiclesApiService } from '../../services/vehicles-api.service';
import { VehicleEntity } from '../../model/vehicle.entity';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-businessman',
  templateUrl: './vehicle-businessman.component.html',
  styleUrls: ['./vehicle-businessman.component.css'],
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

  constructor(
    private vehiclesApi: VehiclesApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  ngOnDestroy(): void {}

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
        this.uploadedImageUrl = reader.result as string; 
      };
      reader.readAsDataURL(file);
    }
  }

  navigateToDetails(vehicleId: number) {
    console.log('Botón clickeado, ID:', vehicleId);
    // Obtener el ID del usuario desde la ruta actual
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.router.navigate([
        '/vehicles-details-businessman',
        userId,
        vehicleId,
      ]);
    } else {
      this.router.navigate(['/vehicles-details-businessman', vehicleId]);
    }
  }

  navigateToCreateVehicle() {
    // Obtener el ID del usuario desde la ruta actual
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.router.navigate(['/create-vehicle-businessman', userId]);
    } else {
      this.router.navigate(['/create-vehicle-businessman']);
    }
  }

  navigateToUpdateVehicle(vehicleId: number) {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.router.navigate(['/vehicles-update', userId, vehicleId]);
    } else {
      this.router.navigate(['/vehicles-update', vehicleId]);
    }
  }

  updateVehicle(vehicle: VehicleEntity): void {
    const vehicleData: Partial<VehicleEntity> = { ...vehicle };

    if (vehicleData.lastTechnicalInspectionDate) {
      try {
        const date = new Date(vehicleData.lastTechnicalInspectionDate);

        if (!isNaN(date.getTime())) {
          vehicleData.lastTechnicalInspectionDate = date.toISOString(); 
        } else {
          console.error(
            'La fecha de inspección técnica no es válida:',
            vehicleData.lastTechnicalInspectionDate
          );
          vehicleData.lastTechnicalInspectionDate = null;
        }
      } catch (e) {
        console.error('Error al procesar lastTechnicalInspectionDate:', e);
        vehicleData.lastTechnicalInspectionDate = null;
      }
    } else {
      vehicleData.lastTechnicalInspectionDate = null;
    }

    this.vehiclesApi
      .updateVehicle(vehicle.id, vehicleData as VehicleEntity)
      .subscribe(
        (updatedVehicle: VehicleEntity) => {
          console.log('Vehículo actualizado exitosamente:', updatedVehicle);
        },
        (error) => {
          console.error('Error al actualizar vehículo:', error);
        }
      );
  }

  closeDetails(): void {
    this.showDetails = false;
    this.selectedVehicle = null;
  }

  deleteVehicle(id: number): void {
    {
      this.vehiclesApi.deleteVehicle(id).subscribe(() => {
        this.vehicles = this.vehicles.filter((vehicle) => vehicle.id !== id);
      });
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.vehicle = new VehicleEntity();
  }
}
