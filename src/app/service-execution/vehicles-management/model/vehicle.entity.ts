export class VehicleEntity {
  id: number;
  managerId: number;
  licensePlate: string;
  brand: string;
  model: string;
  temperature: number;
  humidity: number;
  maxLoad: number;
  driverId: number;
  vehicleImage?: string | null; 
  color: string;
  lastTechnicalInspectionDate: string | null; 
  latitude?: number; 
  longitude?: number; 
  altitude: number | null; 
  location?: string;
  speed: number | string | null;
  createdAt: string;
  GPSDateTime: string; 

  constructor() {
    this.id = 0;
    this.managerId = 0;
    this.licensePlate = '';
    this.brand = '';
    this.model = '';
    this.temperature = 0;
    this.humidity = 0;
    this.maxLoad = 0;
    this.driverId = 0;
    this.vehicleImage = ''; 
    this.color = '';
    this.lastTechnicalInspectionDate = null; 
    this.latitude = 0; 
    this.longitude = 0; 
    this.altitude = 0;
    this.speed = null; 
    this.createdAt = ''; 
    this.GPSDateTime = ''; 
  }
}
