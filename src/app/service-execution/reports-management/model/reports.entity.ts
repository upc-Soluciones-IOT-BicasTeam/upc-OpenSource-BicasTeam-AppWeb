export class ReportEntity {
  idReport: string;
  name: string;
  type: string;
  description: string;
  dateReport: string;
  time: string;

  constructor() {
    this.idReport = '';
    this.name = '';
    this.type = ''
    this.description = '';
    this.dateReport = '';
    this.time = '';
  }
}
