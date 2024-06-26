import { Component, OnInit } from '@angular/core';
import { ReportsApiService} from "../reports-services/report-view.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ReportEntity} from "../model/reports.entity";
import {UserEntity} from "../../../iam/model/user.entity";

@Component({
selector: 'app-report-driver',
templateUrl: './report-driver.component.html',
styleUrls: ['./report-driver.component.css']
})
export class ReportDriverComponent implements OnInit {
  driversNames: any[]=[];
  reports: any[] = [];
  submitted: boolean = false;
  reportDialog: boolean = false;
  report: ReportEntity = {} as ReportEntity;
  user: UserEntity = {} as UserEntity;

  constructor(private route: ActivatedRoute, private router: Router,private reportsApi: ReportsApiService) {
    this.user.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getDataReport(this.user.id);
  }

  async getDataReport(userId:any) {
    try {
      const response: Observable<any> = this.reportsApi.getReportsById(userId);
      const reports = await response.toPromise();
      console.log(reports);
      for (let report of reports) {
        const userResponse: Observable<any> = this.reportsApi.findUserByID(userId);
        const user = await userResponse.toPromise();
        report.name = `${user.name} ${user.lastName}`;
      }
      this.reports = reports;
      this.reports.map((data:any)=>{
        this.reportsApi.findUserByID(data.idUser).subscribe((data:any)=>{
          this.driversNames.push(data[0].name + data[0].lastName)
        })
      })
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  }

  openNew() {
    this.report = {} as ReportEntity;
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
    this.reportDialog = false;
    this.submitted = false;
    this.reports.push(this.report); // Push the new report into the reports array
  }
}
