import { Component, OnInit } from '@angular/core';
import { Activity, Condition, Delivery } from '../../model/profile.entity';
import { ProfileApiService } from '../../services/profile-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-home-driver',
  templateUrl: './profile-home-driver.component.html',
  styleUrl: './profile-home-driver.component.css',
})
export class ProfileHomeDriverComponent implements OnInit {
  activities: Activity[] = [];
  conditions: Condition[] = [];
  deliveries: Delivery[] = [];
  private userId: string | null = null;

  constructor(
    private apiService: ProfileApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.apiService.getAllActivities().subscribe((data) => {
      this.activities = data;
    });
    this.apiService.getAllDeliveries().subscribe((data) => {
      this.deliveries = data;
    });
  }

  onSeeMoreActivities() {
    if (this.userId) {
      this.router.navigate(['/report-carrier', this.userId]);
    } else {
      console.error('User ID not available for navigation');
    }
  }

  onSeeMoreDeliveries() {
    if (this.userId) {
      this.router.navigate(['/shipment-carrier', this.userId]);
    } else {
      console.error('User ID not available for navigation');
    }
  }
}
