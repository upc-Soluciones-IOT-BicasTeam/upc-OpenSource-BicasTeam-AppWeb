import { Component, OnInit } from '@angular/core';
import { VehicleEntity } from '../../model/vehicle.entity';
import { VehiclesApiService } from '../../services/vehicles-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-businessman',
  templateUrl: './vehicle-businessman.component.html',
  styleUrls: ['./vehicle-businessman.component.css']
})
export class VehicleBusinessmanComponent implements OnInit {
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  showDeleteForm: boolean = false;
  deleteVehicleId: number | null = null;
  vehicles: VehicleEntity[] = [];
  vehicle: VehicleEntity = new VehicleEntity();

  constructor(
    private vehiclesApi: VehiclesApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehiclesApi.getAllVehicles().subscribe(
      (data: VehicleEntity[]) => {
        this.vehicles = data;
      },
      (error: any) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  addVehicle(): void {
    this.vehiclesApi.addVehicle(this.vehicle).subscribe(
      (response: VehicleEntity) => {
        this.vehicles.push(response);
        this.vehicle = new VehicleEntity(); // Reset the form
        this.showAddForm = false;
      },
      (error: any) => {
        console.error('Error adding vehicle:', error);
      }
    );
  }

  editVehicle(vehicle: VehicleEntity): void {
    this.vehicle = { ...vehicle }; // Copy the selected vehicle
    this.showEditForm = true;
  }

  updateVehicle(): void {
    this.vehiclesApi.updateVehicle(this.vehicle.id, this.vehicle).subscribe(
      (updatedVehicle: VehicleEntity) => {
        this.vehicles = this.vehicles.map(v => (v.id === updatedVehicle.id ? updatedVehicle : v));
        this.showEditForm = false;
        this.vehicle = new VehicleEntity();
      },
      (error: any) => {
        console.error('Error updating vehicle:', error);
      }
    );
  }

  confirmDelete(id: number): void {
    this.deleteVehicleId = id;
    this.showDeleteForm = true;
  }

  deleteVehicle(): void {
    if (this.deleteVehicleId !== null) {
      this.vehiclesApi.deleteVehicle(this.deleteVehicleId).subscribe(
        () => {
          this.vehicles = this.vehicles.filter(v => v.id !== this.deleteVehicleId);
          this.deleteVehicleId = null;
          this.showDeleteForm = false;
        },
        (error: any) => {
          console.error('Error deleting vehicle:', error);
        }
      );
    }
  }

  cancelForm(): void {
    this.showAddForm = false;
    this.showEditForm = false;
    this.vehicle = new VehicleEntity();
  }

  cancelDelete(): void {
    this.showDeleteForm = false;
    this.deleteVehicleId = null;
  }
}
