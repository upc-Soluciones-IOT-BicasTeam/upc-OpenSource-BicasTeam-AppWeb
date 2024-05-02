import { Component, OnInit } from '@angular/core';

import { ShipmentApiService } from '../../services/shipment-api.service';

@Component({
  selector: 'app-organization-shipment',
  templateUrl: './organization-shipment.component.html',
  styleUrl: './organization-shipment.component.css'
})

export class OrganizationShipmentComponent implements OnInit {
  //shipmentsApi: ShipmentApiService;
  shipments: any[];
  shipment: any;
  submitted: boolean;
  shipmentDialog: boolean;
  selectedShipment: any;
  shipmentDetailsDialog: boolean;

  constructor() {
    //this.shipmentsApi = new ShipmentApiService();
    this.shipments = [];
    this.shipment = {};
    this.submitted = false;
    this.shipmentDialog = false;
    this.selectedShipment = null;
    this.shipmentDetailsDialog = false;
  }

  ngOnInit(): void {
    this.getDataShipment();
  }

  async getDataShipment() {
    const response = await this.shipmentsApi.getAllShipments();
    const shipments = response.data;
    for (let shipment of shipments) {
      const userResponse = await this.shipmentsApi.findUserByID(shipment['id-user']);
      const user = userResponse.data[0];
      shipment.driverName = `${user.name} ${user.lastName}`;
    }
    this.shipments = shipments;
  }

  showShipmentDetails(shipment: any) {
    this.selectedShipment = shipment;
    this.shipmentDetailsDialog = true;
  }

  hideShipmentDetailsDialog() {
    this.shipmentDetailsDialog = false;
  }

  newItem() {
    this.shipment = {
      driverName: '',
      destiny: '',
      description: '',
      dateTime: {
        date: '',
        time: '',
      },
      status: 'Programmed',
    };
    this.submitted = false;
    this.shipmentDialog = true;
  }

  hideDialog() {
    this.shipmentDialog = false;
    this.submitted = false;
  }

  saveShipment() {
    if (!this.shipment.driverName || !this.shipment.destiny || !this.shipment.description || !this.shipment.dateTime.date || !this.shipment.dateTime.time) {
      this.submitted = true;
      return;
    }
    // Logic to save shipment
    this.shipmentDialog = false;
    this.submitted = false;
    alert("Successfully added.");
  }
}

