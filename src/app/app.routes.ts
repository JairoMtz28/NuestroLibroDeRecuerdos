import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'inicio',
    loadComponent: () => import('./inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'visualizar',
    loadComponent: () => import('./visualizar/visualizar.page').then( m => m.VisualizarPage)
  },
  {
    path: 'opciones',
    loadComponent: () => import('./opciones/opciones.page').then( m => m.OpcionesPage)
  },
  {
    path: 'ajustes',
    loadComponent: () => import('./ajustes/ajustes.page').then( m => m.AjustesPage)
  },
];
