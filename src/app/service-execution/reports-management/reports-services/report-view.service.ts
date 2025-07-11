import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportEntity } from '../model/reports.entity';
import { BaseService } from '../../../shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ReportsApiService extends BaseService<ReportEntity> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = 'api/v1/reports';
  }

  // Obtener todos los informes
  getAllReports(): Observable<ReportEntity[]> {
    return this.getAll();
  }

  // Obtener un informe por ID
  getReportById(id: number): Observable<ReportEntity> {
    return this.getById(id);
  }

  // Crear un nuevo informe
  createReport(report: ReportEntity): Observable<ReportEntity> {
    return this.create(report);
  }

  // Actualizar un informe existente
  updateReport(id: number, report: ReportEntity): Observable<ReportEntity> {
    return this.update(id, report);
  }

  // Eliminar un informe por ID
  deleteReport(id: number): Observable<void> {
    return this.delete(id);
  }
}
