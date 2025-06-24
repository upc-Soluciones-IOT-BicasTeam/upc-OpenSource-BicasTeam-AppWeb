export class VehicleEntity {
  id: number;
  managerId: number; // Coincide con 'idManager' del backend
  licensePlate: string;
  brand: string; // Nuevo campo que estaba en el backend
  model: string;
  temperature: number; // Coincide con 'temperature' del backend
  humidity: number;
  maxLoad: number; // Nuevo campo que estaba en el backend
  driverId: number; // Coincide con 'driverId' del backend (antes 'driverName' en el frontend)
  vehicleImage?: string | null; // Permite que sea opcional o `null`
  color: string;
  lastTechnicalInspectionDate: string | null; // Se mantiene como string para las fechas (formato "yyyy-MM-dd HH:mm:ss")
  latitude?: number ; // Puede ser null en el backend, permitimos null aquí
  longitude?: number ; // Puede ser null en el backend, permitimos null aquí
  altitude: number | null; // Puede ser null en el backend, permitimos null aquí
  location?: string;
  speed: number | string |  null; // Nuevo campo que estaba en el backend, puede ser null
  createdAt: string; // Se mantiene como string para las fechas
  GPSDateTime: string; // Nuevo campo que estaba en el backend, para la fecha/hora de la última actualización GPS

  constructor() {
    // Inicializa valores por defecto si es necesario
    this.id = 0;
    this.managerId = 0;
    this.licensePlate = '';
    this.brand = '';
    this.model = '';
    this.temperature = 0;
    this.humidity = 0;
    this.maxLoad = 0;
    this.driverId = 0;
    this.vehicleImage = ''; // Puede ser `null` por defecto
    this.color = '';
    this.lastTechnicalInspectionDate = null; // Se inicializa como string vacío
    this.latitude = 0; // Puede ser `null` por defecto
    this.longitude = 0; // Puede ser `null` por defecto
    this.altitude = 0; // Puede ser `null` por defecto
    this.speed = null; // Puede ser `null` por defecto
    this.createdAt = ''; // Se inicializa como string vacío
    this.GPSDateTime = ''; // Se inicializa como string vacío
  }
}
