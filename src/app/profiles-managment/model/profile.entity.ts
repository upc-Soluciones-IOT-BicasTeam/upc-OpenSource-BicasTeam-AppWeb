export interface Activity {
  id: number;
  userId: number;
  type: string;
  description: string;
  createdAt: string; // ISO string (consider formatting if needed)
  driverName: string;
}

export interface Condition {
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
}

export interface Delivery {
  id: number;
  userId: number;
  destiny: string;
  description: string;
  createdAt: string; // ISO string (consider formatting if needed)
  status: string;
  driverName: string;
}
