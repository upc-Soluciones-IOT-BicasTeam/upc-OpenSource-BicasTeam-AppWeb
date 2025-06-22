// src/app/model/reports.entity.ts

export class ReportEntity {
  id: number;
  type: string;
  description: string;
  userId: number;
  createdAt: string;
  driverName: string;
  level: string;

  // Nuevos campos para el modal de detalles
  technicalProblems: string;
  vehicularInfractions: string;
  roadAccidents: string;
  packageProblems: string;

  constructor() {
    this.id = 0;
    this.type = '';
    this.description = '';
    this.userId = 0;
    this.createdAt = '';
    this.driverName = '';
    this.level = 'Low';

    // Inicializar los nuevos campos
    this.technicalProblems = '';
    this.vehicularInfractions = '';
    this.roadAccidents = '';
    this.packageProblems = '';
  }
}
