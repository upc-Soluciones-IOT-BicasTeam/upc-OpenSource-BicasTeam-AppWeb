import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesApiService } from '../../services/vehicles-api.service';
import { VehicleEntity } from '../../model/vehicle.entity';
declare const google: any;

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  vehicle: VehicleEntity | null = null;
  private map: google.maps.Map | null = null;
  private marker: google.maps.Marker | null = null;

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehiclesApi: VehiclesApiService
  ) {}

  ngOnInit(): void {
    this.loadVehicleDetails();
  }

  ngOnDestroy(): void {
    this.map = null;
    this.marker = null;
  }

  loadVehicleDetails(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.vehiclesApi.getVehicleById(+vehicleId).subscribe(
        (data: VehicleEntity) => {
          const coords = this.extractLatLng(data.location);
          if (coords) {
            data.latitude = coords.lat;
            data.longitude = coords.lng;
          }

          const gpsDate = this.extractGPSDate(data.location);
          if (gpsDate) {
            data.GPSDateTime = gpsDate;
          }

          this.vehicle = data;

          setTimeout(() => this.initMap(), 0);
        },
        (error) => {
          console.error('Error loading vehicle details:', error);
        }
      );
    }
  }
  private initMap(): void {
    if (
      this.vehicle &&
      this.mapContainer?.nativeElement &&
      this.vehicle.location
    ) {
      const coords = this.extractLatLng(this.vehicle.location);
      if (!coords) {
        console.warn(
          'Coordenadas no válidas en location:',
          this.vehicle.location
        );
        return;
      }

      this.map = new google.maps.Map(this.mapContainer.nativeElement, {
        center: coords,
        zoom: 15,
      });

      this.marker = new google.maps.Marker({
        position: coords,
        map: this.map,
        title: this.vehicle.licensePlate,
      });
    } else {
      console.warn('No se puede inicializar el mapa: location es undefined');
    }
  }

  private extractLatLng(
    location?: string
  ): { lat: number; lng: number } | null {
    if (!location) return null;
    try {
      const latMatch = location.match(/Latitude:\s*(-?\d+\.?\d*)/);
      const lngMatch = location.match(/Longitude:\s*(-?\d+\.?\d*)/);
      if (latMatch && lngMatch) {
        return {
          lat: parseFloat(latMatch[1]),
          lng: parseFloat(lngMatch[1]),
        };
      }
      return null;
    } catch {
      return null;
    }
  }

  private extractGPSDate(location?: string): string | null {
    if (!location) return null;
    try {
      const GPSDateMatch = location.match(/GPS Date&Time:\s*([\d\-:\s]+)/);
      if (GPSDateMatch && GPSDateMatch[1]) {
        return GPSDateMatch[1].trim();
      }
      return null;
    } catch {
      return null;
    }
  }

  goBack(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.router.navigate(['/vehicles-businessman', userId]);
    } else {
      this.router.navigate(['/vehicles-businessman']);
    }
  }
}
