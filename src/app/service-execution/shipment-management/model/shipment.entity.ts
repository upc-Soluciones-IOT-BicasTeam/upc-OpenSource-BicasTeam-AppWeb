export class ShipmentEntity {
  id: string;
  idUser: string;
  destiny: string;
  description: string;
  dateTime: {
    date: string;
    time: string;
  };
  status: string;

  constructor() {
    this.id = '';
    this.idUser = '';
    this.destiny = '';
    this.description = '';
    this.dateTime = { date: '', time: '' };
    this.status = '';
  }
}
