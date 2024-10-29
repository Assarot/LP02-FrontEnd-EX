import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Libro } from '../../model/libro';
import { LibroService } from '../../service/libro.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [
    HomeComponent,
    TableModule,
    ButtonModule,
    DialogModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css',
})
export class LibroComponent {
  libros: Libro[] = [];
  titulo: string = '';
  accion: string = '';
  libro = new Libro(0, '', 0, '', '', 0, 0);
  op = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;

  constructor(
    private libroService: LibroService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.listarLibros();
  }

  listarLibros() {
    this.libroService.getLibros().subscribe((data) => {
      this.libros = data;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Libro';
    this.accion = 'Guardar';
    this.op = 0;
    this.visible = true;
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Libro';
    this.accion = 'Editar';
    this.libroService.getLibroById(id).subscribe((data) => {
      this.libro = data;
      this.op = 1;
    });
    this.visible = true;
  }

  deleteLibro(id: number) {
    this.isDeleteInProgress = true;
    this.libroService.eliminarLibro(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Libro eliminado',
        });
        this.isDeleteInProgress = false;
        this.listarLibros();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el libro',
        });
      },
    });
  }

  addLibro(): void {
    this.libro.editorial_id = this.libro.editorial_id || 1; // Valor predeterminado si no se asigna
    this.libro.seccion_id = this.libro.seccion_id || 1; // Valor predeterminado si no se asigna

    console.log('Libro antes de enviar:', this.libro); // Para verificar los valores

    this.libroService.crearLibro(this.libro).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Libro registrado',
        });
        this.listarLibros();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el libro',
        });
      },
    });
    this.visible = false;
  }

  editLibro() {
    this.libroService.actualizarLibro(this.libro).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Libro editado',
        });
        this.listarLibros();
        console.log(
          this.libro.id +
            ' ' +
            this.libro.titulo +
            ' ' +
            this.libro.paginas +
            ' ' +
            this.libro.edicion
        );
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar el libro',
        });
      },
    });
    this.visible = false;
  }

  ejecutarAccion(): void {
    if (this.op == 0) {
      this.addLibro();
      this.limpiar();
    } else if (this.op == 1) {
      this.editLibro();
      this.limpiar();
    } else {
      console.log('No se hace nada');
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.accion = '';
    this.op = 0;
    this.libro.id = 0;
    this.libro.titulo = '';
    this.libro.paginas = 0;
    this.libro.edicion = '';
  }
}
