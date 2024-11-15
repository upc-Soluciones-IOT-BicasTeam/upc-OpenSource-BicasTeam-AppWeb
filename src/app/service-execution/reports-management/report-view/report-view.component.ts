import { Component, OnInit } from '@angular/core';
import { ReportsApiService } from '../reports-services/report-view.service';
import { ReportEntity } from '../model/reports.entity';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {
  reports: ReportEntity[] = [];

  constructor(private reportsApi: ReportsApiService) {}

  ngOnInit(): void {
    this.getDataReports();
  }

  getDataReports(): void {
    this.reportsApi.getAllReports().subscribe(
      (data) => {
        this.reports = data;
        console.log('Reports fetched:', data);
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }
}
