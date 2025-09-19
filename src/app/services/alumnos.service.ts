import { Alumno } from '../models/alumno.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private alumnos: Alumno[] = [
    { id: 1, nombre: 'luis', apellido: 'Pérez', email: 'juan@gmail.com', matricula: '20231001' },
    { id: 2, nombre: 'María', apellido: 'García', email: 'maria@gmail.com', matricula: '20231002' }
  ];

  getAlumnos(): Alumno[] {
    return [...this.alumnos]; 
  }

  addAlumno(alumno: Alumno): void {
    alumno.id = this.alumnos.length > 0 ? Math.max(...this.alumnos.map(a => a.id!)) + 1 : 1;
    this.alumnos.push(alumno);
  }

  deleteAlumno(id: number): void {
    this.alumnos = this.alumnos.filter(alumno => alumno.id !== id);
  }

  getAlumno(id: number): Alumno | undefined {
    return this.alumnos.find(alumno => alumno.id === id);
  }

  updateAlumno(updatedAlumno: Alumno): void {
    const index = this.alumnos.findIndex(alumno => alumno.id === updatedAlumno.id);
    if (index !== -1) {
      this.alumnos[index] = { ...this.alumnos[index], ...updatedAlumno };
    }
  }
}