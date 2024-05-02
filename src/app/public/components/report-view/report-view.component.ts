import { Component, OnInit } from '@angular/core';
import { ReportsApiService} from "../../report-view/report-view.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserEntity} from "../../../iam/model/user.entity";

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})


export class ReportViewComponent implements OnInit {
  reports: any[] = [];
  driversNames: any[]=[];
  user: UserEntity = {} as UserEntity;

  constructor(private route: ActivatedRoute, private router: Router,private reportsApi: ReportsApiService) {
    this.user.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getDataReport();
  }

  async getDataReport() {

    try {
      const response: Observable<any> =  this.reportsApi.getAllReports();
      const reports = await response.toPromise();
      for (let report of reports) {
        const userResponse: Observable<any>  =  this.reportsApi.findUserByID(report['id-user']);
        const user = await userResponse.toPromise();
        report.name = `${user.name} ${user.lastName}`;
      }
      this.reports = reports;
      this.reports.map((data:any)=>{
        this.reportsApi.findUserByID(data.idUser).subscribe((data:any)=>{
          this.driversNames.push(data[0].name + data[0].lastName)
        })
      })
      console.log(this.driversNames)
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  }
}

