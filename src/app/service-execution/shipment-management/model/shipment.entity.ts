export class ShipmentEntity {
  id: number;
  userId: number;
  destiny: string;
  description: string;
  createdAt: Date;
  status: string;
  driverName: string;

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.destiny = '';
    this.description = '';
    this.createdAt = new Date();
    this.status = '';
    this.driverName = '';
  }
}
