import { Routes } from '@angular/router';
import { HomeComponent } from './componente/home/home.component';
import { LibroComponent } from './componente/libro/libro.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'libros',
    component: LibroComponent,
    title: 'Libros',
  },
];
