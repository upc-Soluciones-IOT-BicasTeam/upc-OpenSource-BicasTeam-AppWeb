import { Component, OnInit } from '@angular/core';
import { ReportsApiService } from '../reports-services/report-view.service';
import { ReportEntity } from '../model/reports.entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report-driver',
  templateUrl: './report-driver.component.html',
  styleUrls: ['./report-driver.component.css']
})
export class ReportDriverComponent implements OnInit {
  reports: ReportEntity[] = [];
  report: ReportEntity = new ReportEntity();
  reportDialog: boolean = false;
  submitted: boolean = false;

  constructor(private reportsApi: ReportsApiService) {}

  ngOnInit(): void {
    this.getReports();
  }

  getReports(): void {
    this.reportsApi.getAllReports().subscribe(
      (data: ReportEntity[]) => {
        this.reports = data;
        console.log('Reports:', data);
      },
      (error: any) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  openNew(): void {
    this.report = new ReportEntity();
    this.submitted = false;
    this.reportDialog = true;
  }

  hideDialog(): void {
    this.reportDialog = false;
    this.submitted = false;
  }

  saveReport(): void {
    this.submitted = true;
    if (this.report.type && this.report.description) {
      if (this.report.id) {
        this.reportsApi.updateReport(this.report.id, this.report).subscribe(
          (updatedReport: ReportEntity) => {
            this.reports = this.reports.map(r => r.id === updatedReport.id ? updatedReport : r);
            this.reportDialog = false;
          },
          (error: any) => {
            console.error('Error updating report:', error);
          }
        );
      } else {
        this.reportsApi.createReport(this.report).subscribe(
          (newReport: ReportEntity) => {
            this.reports.push(newReport);
            this.reportDialog = false;
          },
          (error: any) => {
            console.error('Error creating report:', error);
          }
        );
      }
    }
  }

  deleteReport(id: number): void {
    this.reportsApi.deleteReport(id).subscribe(
      () => {
        this.reports = this.reports.filter(r => r.id !== id);
        console.log('Report deleted');
      },
      (error: any) => {
        console.error('Error deleting report:', error);
      }
    );
  }
}
