import { Component, OnInit } from '@angular/core';
// import { ReportsApiService } from "../../report-view/services/reports-api.service";

@Component({
  selector: 'app-report-driver',
  templateUrl: './report-driver.component.html',
  styleUrls: ['./report-driver.component.css']
})
export class ReportDriverComponent implements OnInit {
  reports: any[];
  report: any;
  submitted: boolean = false;
  reportDialog: boolean = false;

  constructor(private reportsApi: ReportsApiService) { }

  ngOnInit(): void {
    this.getDataReport();
  }

  async getDataReport() {
    const response = await this.reportsApi.getAllReports();
    const reports = response.data;
    for (let report of reports) {
      const userResponse = await this.reportsApi.findUserByID(report['id-user']);
      const user = userResponse.data[0];
      report.name = `${user.name} ${user.lastName}`;
    }
    this.reports = reports;
  }

  openNew() {
    this.report = {};
    this.submitted = false;
    this.reportDialog = true;
  }

  hideDialog() {
    this.reportDialog = false;
    this.submitted = false;
  }

  saveReport() {
    if (!this.report.name || !this.report.description) {
      this.submitted = true;
      return;
    }
    // Logic for saving report goes here
    this.reportDialog = false;
    this.submitted = true;
  }
}
