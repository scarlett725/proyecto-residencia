import { Routes, provideRouter } from '@angular/router';

import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { ApplicationConfig } from '@angular/core';
import { AsistenciasComponent } from './pages/asistencias/asistencias.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExamenesComponent } from './pages/examenes/examenes.component';
import { LoginComponent } from './pages/login/login.component';
import { MateriasComponent } from './pages/materias/materias.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { provideHttpClient } from '@angular/common/http';

// Definición de rutas para el sistema proyectoresidencias
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'materias', component: MateriasComponent },
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'examenes', component: ExamenesComponent },
  { path: 'asistencias', component: AsistenciasComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login por defecto
  { path: '**', redirectTo: '/login' } // Maneja rutas no encontradas
];

// Configuración principal de la aplicación
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};