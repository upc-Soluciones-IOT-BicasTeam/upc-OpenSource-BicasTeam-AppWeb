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
  vehicleImage?: string | null; // Permite que sea opcional o `null`
  color: string;
  lastTechnicalInspectionDate: string;
  createdAt: string;

  currentTemperature: number;       // Temperatura ambiente en °C
  cabinTemperature: number;        // Temperatura interior en °C
  humidity: number;                // Humedad relativa en %
  latitude: number;
  longitude: number;
  altitude?: number;

  constructor() {
    // Inicializa valores por defecto si es necesario
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
    this.vehicleImage = null; // Puede ser `null` por defecto
    this.color = '';
    this.lastTechnicalInspectionDate = '';
    this.createdAt = '';
    this.currentTemperature = 0;
    this.cabinTemperature = 0;
    this.humidity = 0;
    this.latitude = 0;
    this.longitude = 0;
  }
}
