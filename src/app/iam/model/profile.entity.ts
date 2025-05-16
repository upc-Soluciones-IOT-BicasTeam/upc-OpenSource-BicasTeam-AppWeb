export class ProfileEntity {
  id: number | null;
  name: string;
  lastName: string;
  idCredentials: number | null;


  constructor() {
    this.id = null; // Inicializa id como null para representar que no está asignado
    this.idCredentials = null;
    this.name = '';
    this.lastName = '';
  }
}
