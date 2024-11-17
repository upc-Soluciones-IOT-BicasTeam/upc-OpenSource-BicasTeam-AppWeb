export class UserEntity {
  id: number | null;
  email: string;
  password: string;
  type: string;
  name: string;
  lastName: string;

  constructor() {
    this.id = null; // Inicializa id como null para representar que no está asignado
    this.email = '';
    this.password = '';
    this.type = '';
    this.name = '';
    this.lastName = '';
  }
}
