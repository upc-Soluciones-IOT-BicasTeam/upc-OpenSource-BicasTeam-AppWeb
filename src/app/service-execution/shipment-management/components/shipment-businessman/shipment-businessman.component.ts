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
      idUser: this.user.id,
      destiny: this.shipment.destiny,
      description: this.shipment.description,
      dateTime: {
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
      },
      status: this.shipment.status
    };
    this.shipmentApiService.addShipment(json).subscribe((response: any) => {
      console.log(response);
      this.shipment = {} as ShipmentEntity;
      this.shipments.push(response);
      this.showAddForm = false;
    });
  }

  deleteShipment() {
    const idToDelete = Number(this.deleteShipmentId);
    this.shipmentApiService.deleteShipment(idToDelete)
      .subscribe(() => {
        this.shipments = this.shipments.filter(shipment => shipment.id !== idToDelete);
        this.deleteShipmentId = '';
        this.showDeleteForm = false;
      });
  }

  async getDataShipment(userId: string) {
    this.shipmentApiService.getAllShipments().subscribe((data:any)=>{
      data.map((data:any)=>{
        console.log(data);
        this.shipments.push(data)
      })
    })

  }

  async getInfoAll(id:any){
    this.iamApi.findUserById(id).subscribe((data:any)=>{
      this.shipments.push(data);
    })

  }
}
