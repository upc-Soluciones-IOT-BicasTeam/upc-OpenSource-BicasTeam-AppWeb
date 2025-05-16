import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent {
  viewMode: 'reports' | 'shipments' | 'vehicles' = 'reports';

  setView(mode: 'reports' | 'shipments' | 'vehicles'): void {
    this.viewMode = mode;
  }
}
