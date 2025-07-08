export class ProfileEntity {
  id: number | null;
  name: string;
  lastName: string;
  idCredential: number | null;
  telephone: string | null;
  idCompany: string | null;


  constructor() {
    this.id = null; // Inicializa id como null para representar que no está asignado
    this.name = '';
    this.lastName = '';
    this.idCredential = null;
    this.telephone = '';
    this.idCompany = '';
  }
}
