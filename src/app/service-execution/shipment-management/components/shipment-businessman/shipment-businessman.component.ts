import { Component, OnInit } from '@angular/core';
import { ShipmentApiService } from "../../services/shipment-api.service";
import { IamApiService } from "../../../../iam/services/iam-api.service.service";
import { ShipmentEntity } from "../../model/shipment.entity";
import { UserEntity } from "../../../../iam/model/user.entity";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-shipment-businessman',
  templateUrl: './shipment-businessman.component.html',
  styleUrls: ['./shipment-businessman.component.css']
})
export class ShipmentBusinessmanComponent implements OnInit {
  showAddForm: boolean = false;
  showDeleteForm: boolean = false;
  deleteShipmentId: number | null = null;
  shipments: ShipmentEntity[] = [];
  shipment: ShipmentEntity = new ShipmentEntity();
  user: UserEntity = {} as UserEntity;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shipmentApiService: ShipmentApiService,
    private iamApi: IamApiService
  ) {
    this.user.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getDataShipment();
  }

  addShipment(): void {
    const shipmentData: Partial<ShipmentEntity> = {
      destiny: this.shipment.destiny,
      description: this.shipment.description,
      status: this.shipment.status,
      driverName: this.shipment.driverName
    };

    this.shipmentApiService.addShipment(shipmentData).subscribe(
      (response: ShipmentEntity) => {
        this.shipments.push(response);
        this.resetForm();
        this.showAddForm = false; // Oculta el formulario después de agregar
      },
      (error) => {
        console.error('Error adding shipment:', error);
      }
    );
  }

  deleteShipment(): void {
    if (this.deleteShipmentId !== null) {
      this.shipmentApiService.deleteShipment(this.deleteShipmentId).subscribe(
        () => {
          this.shipments = this.shipments.filter(
            (shipment) => shipment.id !== this.deleteShipmentId
          );
          this.deleteShipmentId = null;
          this.showDeleteForm = false; // Oculta el formulario después de eliminar
        },
        (error) => {
          console.error('Error deleting shipment:', error);
        }
      );
    }
  }

  getDataShipment(): void {
    this.shipmentApiService.getAllShipments().subscribe(
      (data: ShipmentEntity[]) => {
        this.shipments = data;
      },
      (error) => {
        console.error('Error fetching shipments:', error);
      }
    );
  }

  resetForm(): void {
    this.shipment = new ShipmentEntity();
  }


}
