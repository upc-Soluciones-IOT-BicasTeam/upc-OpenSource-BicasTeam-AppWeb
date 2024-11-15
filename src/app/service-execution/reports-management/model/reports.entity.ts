export class ReportEntity {
  id: number;
  type: string;
  description: string;
  userId: number;
  createdAt: string;
  driverName: string;

  constructor() {
    this.id = 0;
    this.type = '';
    this.description = '';
    this.userId = 0;
    this.createdAt = '';
    this.driverName = '';
  }
}
