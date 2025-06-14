import { Component, OnInit } from '@angular/core';
import { ReportsApiService } from '../reports-services/report-view.service';
import { ReportEntity } from '../model/reports.entity';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {
  reports: ReportEntity[]         = [];
  filteredReports: ReportEntity[] = [];
  types: string[]                 = [];
  selectedType: string            = 'All';
  searchTerm: string              = '';
  showResolveModal: boolean       = false;
  reportToResolve: ReportEntity | null = null;

  constructor(private reportsApi: ReportsApiService) {}

  ngOnInit(): void {
    this.reportsApi.getAllReports().subscribe(
      data => {
        this.reports = data;
        // extraer tipos únicos para el filtro
        this.types = ['All', ...Array.from(new Set(data.map(r => r.type)))];
        this.applyFilters();
      },
      err => console.error('Error loading reports', err)
    );
  }

  applyFilters(): void {
    this.filteredReports = this.reports
      .filter(r => this.selectedType === 'All' || r.type === this.selectedType)
      .filter(r =>
        !this.searchTerm ||
        r.driverName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

  onTypeChange(type: string): void {
    this.selectedType = type;
    this.applyFilters();
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  openResolveConfirm(report: ReportEntity): void {
    this.reportToResolve = report;
    this.showResolveModal = true;
  }

  cancelResolve(): void {
    this.reportToResolve = null;
    this.showResolveModal = false;
  }

  confirmResolve(): void {
    if (!this.reportToResolve) return;
    const id = this.reportToResolve.id;

    this.reportsApi.deleteReport(id).subscribe(
      () => {
        this.reports = this.reports.filter(r => r.id !== id);
        this.applyFilters();
        this.cancelResolve();
      },
      err => {
        console.error(`Error al resolver reporte ${id}:`, err);
        this.cancelResolve();
      }
    );
  }
}
