import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileApiService } from '../../services/profile-api.service';
import { Activity, Condition, Delivery } from '../../model/profile.entity';
import { VehiclesApiService } from '../../../service-execution/vehicles-management/services/vehicles-api.service';
import { VehicleEntity } from '../../../service-execution/vehicles-management/model/vehicle.entity';
import { ShipmentApiService } from '../../../service-execution/shipment-management/services/shipment-api.service';
import { ShipmentEntity } from '../../../service-execution/shipment-management/model/shipment.entity';
import { ReportsApiService } from '../../../service-execution/reports-management/reports-services/report-view.service';
import { ReportEntity } from '../../../service-execution/reports-management/model/reports.entity';
import { forkJoin } from 'rxjs';

interface Issue {
  id: number;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface Vehicle {
  id: number;
  model: string;
  licensePlate: string;
  status: 'active' | 'maintenance' | 'inactive';
}

interface Shipment {
  id: number;
  destination: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
}

@Component({
  selector: 'app-profile-home-businessman',
  templateUrl: './profile-home-businessman.component.html',
  styleUrls: ['./profile-home-businessman.component.css'],
})
export class ProfileHomeBusinessmanComponent implements OnInit {
  issues: Issue[] = [];
  vehicles: Vehicle[] = [];
  shipments: Shipment[] = [];

  activities: Activity[] = [];
  deliveries: Delivery[] = [];
  conditions: Condition[] = [];

  isLoading = true;

  constructor(
    private apiService: ProfileApiService,
    private vehiclesApiService: VehiclesApiService,
    private shipmentsApiService: ShipmentApiService,
    private reportsApiService: ReportsApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.isLoading = true;

    // Cargar todos los datos en paralelo
    forkJoin({
      vehicles: this.vehiclesApiService.getAllVehicles(),
      shipments: this.shipmentsApiService.getAllShipments(),
      reports: this.reportsApiService.getAllReports(),
      activities: this.apiService.getAllActivities(),
      deliveries: this.apiService.getAllDeliveries(),
      conditions: this.apiService.getAllConditions(),
    }).subscribe({
      next: (data) => {
        try {
          this.vehicles = Array.isArray(data.vehicles)
            ? this.processVehicles(data.vehicles)
            : [];

          this.shipments = Array.isArray(data.shipments)
            ? this.processShipments(data.shipments)
            : [];

          this.issues = Array.isArray(data.reports)
            ? this.processReportsAsIssues(data.reports)
            : [];

          this.activities = Array.isArray(data.activities)
            ? data.activities
            : [];
          this.deliveries = Array.isArray(data.deliveries)
            ? data.deliveries
            : [];
          this.conditions = Array.isArray(data.conditions)
            ? data.conditions
            : [];

          console.log('Dashboard data loaded successfully:', {
            vehicles: this.vehicles.length,
            shipments: this.shipments.length,
            issues: this.issues.length,
          });
        } catch (processingError) {
          console.error('Error processing dashboard data:', processingError);
          this.vehicles = [];
          this.shipments = [];
          this.issues = [];
          this.activities = [];
          this.deliveries = [];
          this.conditions = [];
        } finally {
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.vehicles = [];
        this.shipments = [];
        this.issues = [];
        this.activities = [];
        this.deliveries = [];
        this.conditions = [];
        this.isLoading = false;
      },
    });
  }

  private processVehicles(vehicleEntities: VehicleEntity[]): Vehicle[] {
    return vehicleEntities.map((vehicle) => ({
      id: vehicle.id,
      model: `${vehicle.brand || 'Unknown'} ${vehicle.model || 'Model'}`.trim(),
      licensePlate: vehicle.licensePlate || 'N/A',
      status: this.getVehicleStatus(vehicle),
    }));
  }

  private getVehicleStatus(
    vehicle: VehicleEntity
  ): 'active' | 'maintenance' | 'inactive' {
    try {
      const inspectionDate = vehicle.lastTechnicalInspectionDate;
      if (!inspectionDate) return 'inactive';

      const inspection = new Date(inspectionDate);
      const now = new Date();

      if (isNaN(inspection.getTime())) return 'inactive';

      const daysDiff = Math.floor(
        (now.getTime() - inspection.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff > 365) return 'maintenance';

      if (vehicle.driverId && vehicle.driverId > 0) return 'active';

      return 'inactive';
    } catch (error) {
      console.warn('Error processing vehicle status:', error);
      return 'inactive';
    }
  }

  private processShipments(shipmentEntities: ShipmentEntity[]): Shipment[] {
    return shipmentEntities.map((shipment) => ({
      id: shipment.id,
      destination: shipment.destiny || 'Unknown Destination',
      description: shipment.description || 'No description available',
      status: this.normalizeShipmentStatus(shipment.status),
      createdAt: shipment.createdAt
        ? shipment.createdAt.toString()
        : new Date().toISOString(),
    }));
  }

  private normalizeShipmentStatus(
    status: string | null | undefined
  ): 'pending' | 'in-progress' | 'completed' {
    if (!status || typeof status !== 'string') {
      return 'pending';
    }

    const normalizedStatus = status.toLowerCase().trim();
    if (
      normalizedStatus.includes('pending') ||
      normalizedStatus.includes('pendiente')
    )
      return 'pending';
    if (
      normalizedStatus.includes('progress') ||
      normalizedStatus.includes('progreso') ||
      normalizedStatus.includes('proceso')
    )
      return 'in-progress';
    if (
      normalizedStatus.includes('completed') ||
      normalizedStatus.includes('completado') ||
      normalizedStatus.includes('finalizado')
    )
      return 'completed';
    return 'pending'; 
  }

  private processReportsAsIssues(reportEntities: ReportEntity[]): Issue[] {
    return reportEntities
      .filter((report) => {
        const priority = this.normalizePriority(report.level);
        return priority !== 'low';
      })
      .map((report) => ({
        id: report.id,
        title: report.description || `${report.type || 'Unknown'} Report`,
        category: report.type || 'General',
        priority: this.normalizePriority(report.level),
        createdAt: report.createdAt || new Date().toISOString(),
      }));
  }

  private normalizePriority(
    level: string | null | undefined
  ): 'low' | 'medium' | 'high' {
    if (!level || typeof level !== 'string') {
      return 'low'; 
    }

    const normalizedLevel = level.toLowerCase().trim();
    if (
      normalizedLevel.includes('high') ||
      normalizedLevel.includes('alto') ||
      normalizedLevel.includes('critical')
    )
      return 'high';
    if (
      normalizedLevel.includes('medium') ||
      normalizedLevel.includes('medio') ||
      normalizedLevel.includes('moderate')
    )
      return 'medium';
    return 'low';
  }

 
  onManageIssues(): void {
    this.router.navigate(['/reports-businessman']); 
  }

  onManageVehicles(): void {
    this.router.navigate(['/vehicles-businessman']);
  }

  onManageShipments(): void {
    this.router.navigate(['/shipments-businessman']);
  }

  onSeeMoreActivities(): void {
    this.router.navigate(['/activities']); 
  }

  onSeeMoreDeliveries(): void {
    this.router.navigate(['/deliveries']); 
  }

  onSeeMoreCondition(): void {
    this.router.navigate(['/conditions']); 
  }

  refreshData(): void {
    this.loadDashboardData();
  }

  get hasIssues(): boolean {
    return this.issues.length > 0;
  }

  get hasVehicles(): boolean {
    return this.vehicles.length > 0;
  }

  get hasShipments(): boolean {
    return this.shipments.length > 0;
  }
}
