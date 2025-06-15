export class UserEntity {
  id: number | null;
  email: string;
  password: string;
  role: string;


  constructor() {
    this.id = null; // Inicializa id como null para representar que no está asignado
    this.email = '';
    this.password = '';
    this.role = '';

  }
}
