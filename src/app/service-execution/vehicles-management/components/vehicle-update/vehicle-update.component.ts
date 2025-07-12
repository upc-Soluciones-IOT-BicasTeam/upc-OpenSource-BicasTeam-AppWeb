import { Component } from '@angular/core';
import { VehicleEntity } from '../../model/vehicle.entity';
import { VehiclesApiService } from '../../services/vehicles-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-update',
  templateUrl: './vehicle-update.component.html',
  styleUrl: './vehicle-update.component.css',
})
export class VehicleUpdateComponent {
  vehicle: VehicleEntity = new VehicleEntity();
  uploadedImageUrl: string | null = null;
  vehicleId: number | null = null;

  constructor(
    private vehiclesApi: VehiclesApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
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

        if (typeof this.vehicle.speed === 'string') {
          const cleanedSpeedString = this.vehicle.speed
            .replace(' km/h', '')
            .replace('N/A', '0')
            .trim();
          const tempSpeed = parseFloat(cleanedSpeedString);
          this.vehicle.speed = isNaN(tempSpeed) ? 0 : tempSpeed;
        } else if (typeof this.vehicle.speed === 'number') {
          this.vehicle.speed = this.vehicle.speed;
        } else {
          this.vehicle.speed = 0;
        }

        if (this.vehicle.lastTechnicalInspectionDate) {
          try {
            const backendDateString = this.vehicle.lastTechnicalInspectionDate;
            const date = new Date(backendDateString.replace(' ', 'T')); 

            if (!isNaN(date.getTime())) {
              const year = date.getFullYear();
              const month = ('0' + (date.getMonth() + 1)).slice(-2);
              const day = ('0' + date.getDate()).slice(-2);
              const hours = ('0' + date.getHours()).slice(-2);
              const minutes = ('0' + date.getMinutes()).slice(-2);
              this.vehicle.lastTechnicalInspectionDate = `${year}-${month}-${day}T${hours}:${minutes}`;
            } else {
              console.warn(
                'Fecha de inspección técnica inválida del backend al cargar:',
                backendDateString
              );
              this.vehicle.lastTechnicalInspectionDate = null;
            }
          } catch (e) {
            console.error(
              'Error al procesar lastTechnicalInspectionDate del backend al cargar:',
              e
            );
            this.vehicle.lastTechnicalInspectionDate = null;
          }
        } else {
          this.vehicle.lastTechnicalInspectionDate = null;
        }

        if (this.vehicle.vehicleImage) {
          this.uploadedImageUrl = this.vehicle.vehicleImage;
        } else {
          this.uploadedImageUrl = null;
        }
      },
      (error) => {
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
    const vehicleData: Partial<VehicleEntity> = { ...this.vehicle };

    if (vehicleData.lastTechnicalInspectionDate) {
      try {
        const date = new Date(vehicleData.lastTechnicalInspectionDate);
        if (isNaN(date.getTime())) {
          console.error(
            'La fecha de inspección técnica no es válida para envío:',
            vehicleData.lastTechnicalInspectionDate
          );
          vehicleData.lastTechnicalInspectionDate = null;
        } else {
          vehicleData.lastTechnicalInspectionDate = date.toISOString();
        }
      } catch (e) {
        console.error(
          'Error al procesar lastTechnicalInspectionDate para envío:',
          e
        );
        vehicleData.lastTechnicalInspectionDate = null;
      }
    } else {
      vehicleData.lastTechnicalInspectionDate = null;
    }

    if (typeof vehicleData.speed === 'string') {
      const cleanedSpeedString = (vehicleData.speed as string)
        .replace(' km/h', '')
        .replace('N/A', '0')
        .trim();
      const tempSpeed = parseFloat(cleanedSpeedString);
      vehicleData.speed = isNaN(tempSpeed) ? 0 : tempSpeed;
    } else if (vehicleData.speed === null || vehicleData.speed === undefined) {
      vehicleData.speed = 0;
    }

    if (vehicleData.managerId === undefined || vehicleData.managerId === null) {
      console.error('ID del Manager es requerido.');
      return;
    }

    console.log('JSON a enviar:', vehicleData);

    this.vehiclesApi
      .updateVehicle(this.vehicle.id, vehicleData as VehicleEntity)
      .subscribe(
        (data: VehicleEntity) => {
          console.log('Vehículo actualizado exitosamente:', data);
          const userId = this.route.snapshot.paramMap.get('id');
          if (userId) {
            this.router.navigate(['/vehicles-businessman', userId]);
          } else {
            this.router.navigate(['/vehicles-businessman']);
          }
        },
        (error) => {
          console.error('Error al actualizar vehículo:', error);
          console.log('Detalles del error del backend:', error.error);
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
