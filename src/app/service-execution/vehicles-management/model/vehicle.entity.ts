export class VehicleEntity {
  id: number;
  userId: number;
  licensePlate: string;
  model: string;
  engine: number;
  fuel: number;
  tires: number;
  electricalSystem: number;
  transmissionTemperature: number;
  driverName: string;
  vehicleImage: string;
  color: string;
  lastTechnicalInspectionDate: string;
  createdAt: string;

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.licensePlate = '';
    this.model = '';
    this.engine = 0;
    this.fuel = 0;
    this.tires = 0;
    this.electricalSystem = 0;
    this.transmissionTemperature = 0;
    this.driverName = '';
    this.vehicleImage = '';
    this.color = '';
    this.lastTechnicalInspectionDate = '';
    this.createdAt = '';
  }
}
