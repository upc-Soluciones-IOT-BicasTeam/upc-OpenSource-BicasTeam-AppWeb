// src/app/report-view/report-view.component.ts

import { Component, OnInit } from '@angular/core';
import { ReportsApiService } from '../reports-services/report-view.service';
import { ReportEntity } from '../model/reports.entity';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {
  // Listas y filtros
  reports: ReportEntity[]       = [];
  filteredReports: ReportEntity[] = [];
  levels: string[]              = ['All', 'Low', 'Medium', 'High'];
  selectedLevel: string         = 'All';
  searchTerm: string            = '';

  // Reporte seleccionado para el modal
  selectedReport: ReportEntity | null = null;

  // Control del diálogo de confirmación
  showDeleteModal: boolean        = false;
  reportToDelete: ReportEntity | null = null;

  constructor(private reportsApi: ReportsApiService) {}

  ngOnInit(): void {
    this.getDataReports();
  }

  // Carga todos los reportes y aplica el filtro inicial
  getDataReports(): void {
    this.reportsApi.getAllReports().subscribe(
      data => {
        this.reports = data;
        this.applyFilters();
      },
      error => console.error('Error fetching reports:', error)
    );
  }

  // Filtra por nivel y por término de búsqueda
  applyFilters(): void {
    this.filteredReports = this.reports
      .filter(r => this.selectedLevel === 'All' || r.level === this.selectedLevel)
      .filter(r =>
        this.searchTerm.trim() === '' ||
        r.driverName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

  onLevelChange(level: string): void {
    this.selectedLevel = level;
    this.applyFilters();
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  // Abre el modal de detalles y carga el reporte completo
  selectReport(report: ReportEntity): void {
    this.selectedReport = report;
    this.reportsApi.getReportById(report.id).subscribe(
      full => this.selectedReport = full,
      err  => console.error('Error fetching report detail:', err)
    );
  }

  // Cierra el modal de detalles
  closeDetails(): void {
    this.selectedReport = null;
  }

  // ——— Nuevo: flujo de confirmación de borrado ———

  /** Muestra el diálogo de confirmación */
  openDeleteConfirm(report: ReportEntity): void {
    this.reportToDelete = report;
    this.showDeleteModal = true;
  }

  /** Cancela el borrado */
  cancelDelete(): void {
    this.reportToDelete = null;
    this.showDeleteModal = false;
  }

  /** Confirma y ejecuta el borrado */
  confirmDelete(): void {
    if (!this.reportToDelete) return;

    const id = this.reportToDelete.id;
    this.reportsApi.deleteReport(id).subscribe(
      () => {
        // Remueve el reporte de ambas listas
        this.reports = this.reports.filter(r => r.id !== id);
        this.applyFilters();

        // Cierra modal de detalles si era el mismo
        if (this.selectedReport?.id === id) {
          this.closeDetails();
        }

        // Cierra el diálogo de confirmación
        this.cancelDelete();
      },
      error => console.error(`Error deleting report ${id}:`, error)
    );
  }
}
