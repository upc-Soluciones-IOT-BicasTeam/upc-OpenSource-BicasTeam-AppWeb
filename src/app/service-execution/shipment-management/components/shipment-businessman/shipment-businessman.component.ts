import { Component } from '@angular/core';
import {ShipmentApiService} from "../../services/shipment-api.service";
import {IamApiService} from "../../../../iam/services/iam-api.service.service";
import {ShipmentEntity} from "../../model/shipment.entity";
import {UserEntity} from "../../../../iam/model/user.entity";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-shipment-businessman',
  templateUrl: './shipment-businessman.component.html',
  styleUrl: './shipment-businessman.component.css'
})
export class ShipmentBusinessmanComponent {
  showAddForm: boolean = false;
  showDeleteForm: boolean = false;
  deleteShipmentId: string = '';
  shipments: any[] = [];
  shipmentsId:any[] = [];
  shipment: ShipmentEntity = {} as ShipmentEntity;
  user: UserEntity = {} as UserEntity;

  constructor(private route: ActivatedRoute, private router: Router,private shipmentApiService: ShipmentApiService,private iamApi: IamApiService) {
    this.user.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getDataShipment(this.user.id);
  }

  addShipment() {
    const json = {
      dateShipment: this.shipment.dateShipment,
      time: this.shipment.time,
      description: this.shipment.description,
      idShipment: this.shipment.idShipment,
      destiny: this.shipment.destiny,
      shipmentStatus: this.shipment.shipmentStatus,

    };
    this.shipmentApiService.addShipment(json)
      .subscribe((response:any) => {
        this.shipment.dateShipment="";
        this.shipment.time="";
        this.shipment.description="";
        this.shipment.idShipment="";
        this.shipment.destiny="";
        this.shipment.shipmentStatus="";

      });
  }

  deleteShipment() {
    this.shipmentApiService.deleteShipment(this.deleteShipmentId)
      .subscribe(() => {
        this.deleteShipmentId = '';
      });
  }

  async getDataShipment(userId: string) {
    this.iamApi.findUserById(userId).subscribe(async(data:any)=>{
      data[0].shipments.map((data:any)=>{
        this.shipmentsId.push(data.idVehicle);
      });
      this.shipmentsId.map(async(data:any)=>{
        await this.getInfoAll(this.shipmentsId[data-1])
      })

    });


  }

  async getInfoAll(id:any){
    this.iamApi.findUserById(id).subscribe((data:any)=>{
      this.shipments.push(data);
    })

  }
}
