import { Component, OnInit } from '@angular/core';

import { Alumno } from '../../models/alumno.model';
import { AlumnosService } from '../../services/alumnos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AlumnosComponent implements OnInit {
  isSidebarOpen = true;
  isFullScreen = false;
  alumnos: Alumno[] = [];
  nuevoAlumno: Alumno = { nombre: '', apellido: '', email: '', matricula: '' };
  editando: boolean = false;
  alumnoEditando?: Alumno;

  constructor(private alumnosService: AlumnosService) {}

  ngOnInit(): void {
    this.alumnos = this.alumnosService.getAlumnos();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    if (this.isFullScreen) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  logout() {
    console.log('Cierre de sesión iniciado');
    // Lógica futura: redirigir a login
    // Ejemplo: this.router.navigate(['/login']);
  }

  agregarOEditarAlumno(): void {
    if (this.editando && this.alumnoEditando) {
      this.alumnosService.updateAlumno({ ...this.alumnoEditando, ...this.nuevoAlumno });
    } else {
      this.alumnosService.addAlumno({ ...this.nuevoAlumno });
    }
    this.cancelar();
  }

  editarAlumno(alumno: Alumno): void {
    this.editando = true;
    this.alumnoEditando = { ...alumno };
    this.nuevoAlumno = { ...alumno };
  }

  eliminarAlumno(id: number): void {
    if (confirm('¿Estás seguro de eliminar este alumno?')) {
      this.alumnosService.deleteAlumno(id);
      this.alumnos = this.alumnosService.getAlumnos();
    }
  }

  cancelar(): void {
    this.editando = false;
    this.alumnoEditando = undefined;
    this.nuevoAlumno = { nombre: '', apellido: '', email: '', matricula: '' };
  }
}