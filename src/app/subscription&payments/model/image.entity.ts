export class ImageEntity {
  id: number | null;
  idManager: number | null;
  filename: string | any;
  contentType: string | any;
  data: string | any;

  constructor() {
    this.id = null;
    this.filename = '';
    this.contentType = '';
    this.data = '';
    this.idManager = null;

  }
}
