import { ReportEntity } from '../../service-execution/reports-management/model/reports.entity';
import { ShipmentEntity } from '../../service-execution/shipment-management/model/shipment.entity';
import { VehicleEntity } from '../../service-execution/vehicles-management/model/vehicle.entity';

export class AnalyticsStatsEntity {
  totalDrivers: number;
  totalVehicles: number;
  avgVehiclesPerDriver: number;

  // Nuevas propiedades para listas agrupadas por transportista
  reportsByDriver?: { driverName: string; reports: ReportEntity[] }[];
  shipmentsByDriver?: { driverName: string; shipments: ShipmentEntity[] }[];
  vehiclesByDriver?: { driverName: string; vehicles: VehicleEntity[] }[];

  constructor() {
    this.totalDrivers = 0;
    this.totalVehicles = 0;
    this.avgVehiclesPerDriver = 0;
    // Las listas pueden inicializarse vacías si lo prefieres
    // this.reportsByDriver = [];
    // this.shipmentsByDriver = [];
    // this.vehiclesByDriver = [];
  }
}
