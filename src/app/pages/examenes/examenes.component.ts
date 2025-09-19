import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Examen {
  id: number;
  nombre: string;
  materia: string;
  fecha: string;
}

@Component({
  selector: 'app-examenes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent {
  examenes: Examen[] = [
    { id: 1, nombre: 'Examen Parcial 1', materia: 'Matemáticas', fecha: '2025-09-01' },
    { id: 2, nombre: 'Examen Parcial 2', materia: 'Física', fecha: '2025-09-10' },
    { id: 3, nombre: 'Examen Final', materia: 'Historia', fecha: '2025-09-20' }
  ];

  nuevoExamen: Examen = { id: 0, nombre: '', materia: '', fecha: '' };
  editarModo: boolean = false;
  examenEditandoId: number | null = null;

  agregarExamen() {
    if (this.nuevoExamen.nombre && this.nuevoExamen.materia && this.nuevoExamen.fecha) {
      const id = this.examenes.length + 1;
      this.examenes.push({ ...this.nuevoExamen, id });
      this.nuevoExamen = { id: 0, nombre: '', materia: '', fecha: '' };
    }
  }

  editarExamen(examen: Examen) {
    this.editarModo = true;
    this.examenEditandoId = examen.id;
    this.nuevoExamen = { ...examen };
  }

  guardarEdicion() {
    if (this.examenEditandoId !== null) {
      const index = this.examenes.findIndex(e => e.id === this.examenEditandoId);
      if (index > -1) {
        this.examenes[index] = { ...this.nuevoExamen, id: this.examenEditandoId };
      }
      this.editarModo = false;
      this.examenEditandoId = null;
      this.nuevoExamen = { id: 0, nombre: '', materia: '', fecha: '' };
    }
  }

  eliminarExamen(id: number) {
    this.examenes = this.examenes.filter(e => e.id !== id);
  }

  cancelarEdicion() {
    this.editarModo = false;
    this.examenEditandoId = null;
    this.nuevoExamen = { id: 0, nombre: '', materia: '', fecha: '' };
  }
}
