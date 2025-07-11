import { Component, OnInit } from '@angular/core';
import { ReportsApiService } from '../../../service-execution/reports-management/reports-services/report-view.service';
import { ShipmentApiService } from '../../../service-execution/shipment-management/services/shipment-api.service';
import { VehiclesApiService } from '../../../service-execution/vehicles-management/services/vehicles-api.service';
import { ReportEntity } from '../../../service-execution/reports-management/model/reports.entity';
import { ShipmentEntity } from '../../../service-execution/shipment-management/model/shipment.entity';
import { VehicleEntity } from '../../../service-execution/vehicles-management/model/vehicle.entity';

interface ReportsByDriver {
  driverName: string;
  reports: ReportEntity[];
}

interface ShipmentsByDriver {
  driverName: string;
  shipments: ShipmentEntity[];
}

interface VehiclesByDriver {
  driverName: string;
  vehicles: VehicleEntity[];
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {
  viewMode: 'reports' | 'shipments' | 'vehicles' = 'reports';

  // Reportes
  reportsByDriver: ReportsByDriver[] = [];
  loadingReports = false;
  errorReports = false;

  // Envíos
  shipmentsByDriver: ShipmentsByDriver[] = [];
  loadingShipments = false;
  errorShipments = false;

  // Vehículos
  vehiclesByDriver: VehiclesByDriver[] = [];
  loadingVehicles = false;
  errorVehicles = false;

  constructor(
    private reportsApi: ReportsApiService,
    private shipmentApi: ShipmentApiService,
    private vehiclesApi: VehiclesApiService
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  setView(mode: 'reports' | 'shipments' | 'vehicles'): void {
    this.viewMode = mode;
    if (mode === 'reports' && this.reportsByDriver.length === 0) {
      this.loadReports();
    }
    if (mode === 'shipments' && this.shipmentsByDriver.length === 0) {
      this.loadShipments();
    }
    if (mode === 'vehicles' && this.vehiclesByDriver.length === 0) {
      this.loadVehicles();
    }
  }

  loadReports(): void {
    this.loadingReports = true;
    this.errorReports = false;
    this.reportsApi.getAllReports().subscribe(
      (data: ReportEntity[]) => {
        const grouped: { [driver: string]: ReportEntity[] } = {};
        data.forEach((report) => {
          if (!grouped[report.driverName]) {
            grouped[report.driverName] = [];
          }
          grouped[report.driverName].push(report);
        });
        this.reportsByDriver = Object.keys(grouped).map((driverName) => ({
          driverName,
          reports: grouped[driverName],
        }));
        this.loadingReports = false;
      },
      (error: any) => {
        this.errorReports = true;
        this.loadingReports = false;
        console.error('Error loading reports:', error);
      }
    );
  }

  loadShipments(): void {
    this.loadingShipments = true;
    this.errorShipments = false;
    this.shipmentApi.getAllShipments().subscribe(
      (data: ShipmentEntity[]) => {
        const grouped: { [driver: string]: ShipmentEntity[] } = {};
        data.forEach((shipment) => {
          if (!grouped[shipment.driverName]) {
            grouped[shipment.driverName] = [];
          }
          grouped[shipment.driverName].push(shipment);
        });
        this.shipmentsByDriver = Object.keys(grouped).map((driverName) => ({
          driverName,
          shipments: grouped[driverName],
        }));
        this.loadingShipments = false;
      },
      (error: any) => {
        this.errorShipments = true;
        this.loadingShipments = false;
        console.error('Error loading shipments:', error);
      }
    );
  }

  loadVehicles(): void {
    this.loadingVehicles = true;
    this.errorVehicles = false;
    this.vehiclesApi.getAllVehicles().subscribe(
      (data: VehicleEntity[]) => {
        const grouped: { [driver: string]: VehicleEntity[] } = {};
        data.forEach((vehicle) => {
          // Use driverId as the key since we don't have driverName
          const driverKey = `Driver ${vehicle.driverId}`;
          if (!grouped[driverKey]) {
            grouped[driverKey] = [];
          }
          grouped[driverKey].push(vehicle);
        });
        this.vehiclesByDriver = Object.keys(grouped).map((driverName) => ({
          driverName,
          vehicles: grouped[driverName],
        }));
        this.loadingVehicles = false;
      },
      (error) => {
        this.errorVehicles = true;
        this.loadingVehicles = false;
        console.error('Error loading vehicles:', error);
      }
    );
  }

  // --- Analíticas para Reportes ---
  get totalReports(): number {
    return this.reportsByDriver.reduce(
      (sum, group) => sum + group.reports.length,
      0
    );
  }

  get avgReportsPerDriver(): number {
    if (this.reportsByDriver.length === 0) return 0;
    return +(this.totalReports / this.reportsByDriver.length).toFixed(2);
  }

  get driverWithMostReports(): string | null {
    if (this.reportsByDriver.length === 0) return null;
    const max = this.reportsByDriver.reduce((prev, curr) =>
      curr.reports.length > prev.reports.length ? curr : prev
    );
    return `${max.driverName} (${max.reports.length})`;
  }

  // --- Analíticas para Envíos ---
  get totalShipments(): number {
    return this.shipmentsByDriver.reduce(
      (sum, group) => sum + group.shipments.length,
      0
    );
  }

  get avgShipmentsPerDriver(): number {
    if (this.shipmentsByDriver.length === 0) return 0;
    return +(this.totalShipments / this.shipmentsByDriver.length).toFixed(2);
  }

  get driverWithMostShipments(): string | null {
    if (this.shipmentsByDriver.length === 0) return null;
    const max = this.shipmentsByDriver.reduce((prev, curr) =>
      curr.shipments.length > prev.shipments.length ? curr : prev
    );
    return `${max.driverName} (${max.shipments.length})`;
  }

  // --- Analíticas para Vehículos ---
  get totalVehicles(): number {
    return this.vehiclesByDriver.reduce(
      (sum, group) => sum + group.vehicles.length,
      0
    );
  }

  get avgVehiclesPerDriver(): number {
    if (this.vehiclesByDriver.length === 0) return 0;
    return +(this.totalVehicles / this.vehiclesByDriver.length).toFixed(2);
  }

  get driverWithMostVehicles(): string | null {
    if (this.vehiclesByDriver.length === 0) return null;
    const max = this.vehiclesByDriver.reduce((prev, curr) =>
      curr.vehicles.length > prev.vehicles.length ? curr : prev
    );
    return `${max.driverName} (${max.vehicles.length})`;
  }
}
