import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ShipmentApiService } from "../../services/shipment-api.service";
import { ShipmentEntity } from "../../model/shipment.entity";

@Component({
  selector: 'app-shipment-carrier',
  templateUrl: './shipment-carrier.component.html',
  styleUrls: ['./shipment-carrier.component.css']
})
export class ShipmentCarrierComponent implements OnInit {
  shipments: ShipmentEntity[] = [];
  userId: number;

  constructor(
    private route: ActivatedRoute,
    private shipmentApiService: ShipmentApiService
  ) {
    this.userId = +this.route.snapshot.params['id']; // Convierte el parámetro a número
  }

  ngOnInit(): void {
    this.getShipmentsByUserId(this.userId);
  }

  getShipmentsByUserId(userId: number): void {
    this.shipmentApiService.getShipmentsByUserId(userId).subscribe(
      (data: ShipmentEntity[]) => {
        this.shipments = data;
      },
      (error) => {
        console.error('Error fetching shipments:', error);
      }
    );
  }
}
