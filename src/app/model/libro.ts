export class Libro {
  id: number;
  titulo: string;
  paginas: number;
  edicion: string;
  estado: string;
  seccion_id: number;
  editorial_id: number;

  constructor(
    id: number,
    titulo: string,
    paginas: number,
    edicion: string,
    estado: string,
    seccion_id: number,
    editorial_id: number
  ) {
    this.id = id;
    this.titulo = titulo;
    this.paginas = paginas;
    this.edicion = edicion;
    this.estado = estado;
    this.seccion_id = seccion_id;
    this.editorial_id = editorial_id;
  }
}
