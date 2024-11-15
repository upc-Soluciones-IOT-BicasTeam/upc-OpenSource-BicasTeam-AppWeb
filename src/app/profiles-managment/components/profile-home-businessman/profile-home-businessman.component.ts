import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileApiService } from '../../services/profile-api.service';
import { Activity, Condition, Delivery } from '../../model/profile.entity';

@Component({
  selector: 'app-profile-home-businessman',
  templateUrl: './profile-home-businessman.component.html',
  styleUrls: ['./profile-home-businessman.component.css']
})
export class ProfileHomeBusinessmanComponent implements OnInit {
  activities: Activity[] = [];
  deliveries: Delivery[] = [];
  conditions: Condition[] = [];

  constructor(private apiService: ProfileApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getAllActivities().subscribe(data => {
      this.activities = data;
    });

    this.apiService.getAllDeliveries().subscribe(data => {
      this.deliveries = data;
    });

    this.apiService.getAllConditions().subscribe(data => {
      this.conditions = data;
    });
  }

  // Métodos agregados para manejar las acciones de los botones
  onSeeMoreActivities(): void {
    this.router.navigate(['/activities']); // Ajusta la ruta según tu aplicación
  }

  onSeeMoreDeliveries(): void {
    this.router.navigate(['/deliveries']); // Ajusta la ruta según tu aplicación
  }

  onSeeMoreCondition(): void {
    this.router.navigate(['/conditions']); // Ajusta la ruta según tu aplicación
  }
}
