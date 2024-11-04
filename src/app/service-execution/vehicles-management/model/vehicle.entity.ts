export class VehicleEntity {
  idVehicle: any;
  licensePlate: string;
  modelSerialNumber: string;
  idPropietario: number;
  idTransportista: number;


  constructor() {
    this.idVehicle='';
    this.modelSerialNumber='';
    this.licensePlate='';
    this.idPropietario=0;
    this.idTransportista=0;
  }

}
