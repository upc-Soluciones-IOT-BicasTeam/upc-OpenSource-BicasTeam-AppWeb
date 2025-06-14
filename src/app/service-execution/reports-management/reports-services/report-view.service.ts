import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportEntity } from '../model/reports.entity';

@Injectable({
  providedIn: 'root'
})
export class ReportsApiService {
  private baseURL = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  // Obtener todos los informes
  getAllReports(): Observable<ReportEntity[]> {
    return this.http.get<ReportEntity[]>(`${this.baseURL}`);
  }

  // Obtener un informe por ID
  getReportById(id: number): Observable<ReportEntity> {
    return this.http.get<ReportEntity>(`${this.baseURL}/${id}`);
  }

  // Crear un nuevo informe
  createReport(report: ReportEntity): Observable<ReportEntity> {
    return this.http.post<ReportEntity>(`${this.baseURL}`, report);
  }

  // Actualizar un informe existente
  updateReport(id: number, report: ReportEntity): Observable<ReportEntity> {
    return this.http.put<ReportEntity>(`${this.baseURL}/${id}`, report);
  }

  // Eliminar un informe por ID
  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }
}
