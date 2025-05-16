import { Component, OnInit } from '@angular/core';
import { ReportsApiService } from '../../../service-execution/reports-management/reports-services/report-view.service';
import { ReportEntity } from '../../../service-execution/reports-management/model/reports.entity';

interface ReportsByDriver {
  driverName: string;
  reports: ReportEntity[];
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {
  viewMode: 'reports' | 'shipments' | 'vehicles' = 'reports';

  reportsByDriver: ReportsByDriver[] = [];
  loadingReports = false;
  errorReports = false;

  constructor(private reportsApi: ReportsApiService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  setView(mode: 'reports' | 'shipments' | 'vehicles'): void {
    this.viewMode = mode;
    if (mode === 'reports' && this.reportsByDriver.length === 0) {
      this.loadReports();
    }
    // Aquí luego puedes cargar envíos o vehículos según el modo
  }

  loadReports(): void {
    this.loadingReports = true;
    this.errorReports = false;
    this.reportsApi.getAllReports().subscribe(
      (data: ReportEntity[]) => {
        // Agrupa los reportes por driverName
        const grouped: { [driver: string]: ReportEntity[] } = {};
        data.forEach((report) => {
          if (!grouped[report.driverName]) {
            grouped[report.driverName] = [];
          }
          grouped[report.driverName].push(report);
        });
        this.reportsByDriver = Object.keys(grouped).map((driverName) => ({
          driverName,
          reports: grouped[driverName],
        }));
        this.loadingReports = false;
      },
      (error: any) => {
        this.errorReports = true;
        this.loadingReports = false;
        console.error('Error loading reports:', error);
      }
    );
  }
}
