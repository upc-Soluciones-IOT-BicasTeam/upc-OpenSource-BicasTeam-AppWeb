
import { Component, OnInit } from '@angular/core';
import { Activity, Condition, Delivery } from "../../model/profile.entity";
import {ProfileApiService} from "../../services/profile-api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-home-driver',
  templateUrl: './profile-home-driver.component.html',
  styleUrl: './profile-home-driver.component.css'
})
export class ProfileHomeDriverComponent implements OnInit  {
  activities: Activity[] = [];
  conditions: Condition[] = [];
  deliveries: Delivery[] = [];

  constructor(private apiService: ProfileApiService ,
              private router: Router) { }

  ngOnInit(): void {
    this.apiService.getAllActivities().subscribe(data => {
      this.activities = data;
    });
    this.apiService.getAllDeliveries().subscribe(data => {
      this.deliveries = data;
    });
  }
  onSeeMoreActivities() {

    this.router.navigate([ `:id/report-carrier`]);
  }
  onSeeMoreDeliveries() {

    this.router.navigate([ `:id/shipment-carrier`]);
  }

}
