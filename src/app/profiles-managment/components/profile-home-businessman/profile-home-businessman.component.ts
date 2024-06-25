import { Component, OnInit } from '@angular/core';
import { Activity, Condition, Delivery } from "../../model/profile.entity";
import {ProfileApiService} from "../../services/profile-api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-home-businessman',
  templateUrl: './profile-home-businessman.component.html',
  styleUrl: './profile-home-businessman.component.css'
})
export class ProfileHomeBusinessmanComponent implements OnInit  {
  activities: Activity[] = [];
  conditions: Condition[] = [];
  deliveries: Delivery[] = [];

  constructor(private apiService: ProfileApiService ,
              private router: Router) { }

  ngOnInit(): void {
    this.apiService.getAllActivities().subscribe(data => {
      this.activities = data;
    });
    this.apiService.getAllCondition().subscribe(data => {
      this.conditions = data;
    });
    this.apiService.getAllDeliveries().subscribe(data => {
      this.deliveries = data;
    });
  }
  onSeeMoreActivities() {

    this.router.navigate([ `:id/report-businessman`]);
  }
  onSeeMoreDeliveries() {

    this.router.navigate([ `:id/shipment-businessman`]);
  }
  onSeeMoreCondition() {

    this.router.navigate([ `:id/vehicles-businessman`]);
  }

}

