import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Materia {
  id: number;
  nombre: string;
  codigo: string;
  profesor: string;
}

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent {
  isSidebarOpen = true;
  isFullScreen = false; 
  materias: Materia[] = [
    { id: 1, nombre: 'Matemáticas', codigo: 'MAT101', profesor: 'Juan Pérez' },
    { id: 2, nombre: 'Física', codigo: 'FIS102', profesor: 'María López' },
    { id: 3, nombre: 'Historia', codigo: 'HIS103', profesor: 'Carlos Gómez' }
  ];

  nuevaMateria: Materia = { id: 0, nombre: '', codigo: '', profesor: '' };
  editarModo: boolean = false;
  materiaEditandoId: number | null = null;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleFullScreen() { 
    this.isFullScreen = !this.isFullScreen;
    if (this.isFullScreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error('Error al entrar en pantalla completa:', err);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(err => {
        console.error('Error al salir de pantalla completa:', err);
      });
    }
  }

  logout() { 
    console.log('Cierre de sesión iniciado');
 
 
  }

  agregarMateria() {
    if (this.nuevaMateria.nombre && this.nuevaMateria.codigo && this.nuevaMateria.profesor) {
      const id = this.materias.length > 0 ? Math.max(...this.materias.map(m => m.id)) + 1 : 1;
      this.materias.push({ ...this.nuevaMateria, id });
      this.nuevaMateria = { id: 0, nombre: '', codigo: '', profesor: '' };
    }
  }

  editarMateria(materia: Materia) {
    this.editarModo = true;
    this.materiaEditandoId = materia.id;
    this.nuevaMateria = { ...materia };
  }

  guardarEdicion() {
    if (this.materiaEditandoId !== null) {
      const index = this.materias.findIndex(m => m.id === this.materiaEditandoId);
      if (index > -1) {
        this.materias[index] = { ...this.nuevaMateria, id: this.materiaEditandoId };
      }
      this.editarModo = false;
      this.materiaEditandoId = null;
      this.nuevaMateria = { id: 0, nombre: '', codigo: '', profesor: '' };
    }
  }

  eliminarMateria(id: number) {
    this.materias = this.materias.filter(m => m.id !== id);
  }

  cancelarEdicion() {
    this.editarModo = false;
    this.materiaEditandoId = null;
    this.nuevaMateria = { id: 0, nombre: '', codigo: '', profesor: '' };
  }
}