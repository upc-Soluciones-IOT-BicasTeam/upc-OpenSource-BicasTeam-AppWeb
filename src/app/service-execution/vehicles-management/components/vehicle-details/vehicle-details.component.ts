import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesApiService } from '../../services/vehicles-api.service';
import { VehicleEntity } from '../../model/vehicle.entity';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';


@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  vehicle: VehicleEntity | null = null;
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;

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
    this.destroyMap();
  }

  loadVehicleDetails(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.vehiclesApi.getVehicleById(+vehicleId).subscribe(
        (data: VehicleEntity) => {
          this.vehicle = data;
          setTimeout(() => this.initMap(), 0); // Espera a que se renderice el mapa
        },
        (error) => {
          console.error('Error loading vehicle details:', error);
        }
      );
    }
  }

  private initMap(): void {
    if (this.vehicle && this.mapContainer?.nativeElement && !this.map) {
      this.map = L.map(this.mapContainer.nativeElement).setView(
        [this.vehicle.latitude, this.vehicle.longitude],
        15
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.marker = L.marker([this.vehicle.latitude, this.vehicle.longitude])
        .addTo(this.map)
        .bindPopup(`<b>${this.vehicle.licensePlate}</b>`)
        .openPopup();
    }
  }

  private destroyMap(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
      this.marker = null;
    }
  }

  goBack(): void {
    this.router.navigate([':id/vehicles-businessman']);
  }
}
