import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  // Lista de usuarios de prueba
  usuarios: Usuario[] = [
    { id: 1, nombre: 'Juan Pérez', correo: 'juan@correo.com', rol: 'Admin' },
    { id: 2, nombre: 'María López', correo: 'maria@correo.com', rol: 'Profesor' },
    { id: 3, nombre: 'Carlos Gómez', correo: 'carlos@correo.com', rol: 'Profesor' }
  ];

  nuevoUsuario: Usuario = { id: 0, nombre: '', correo: '', rol: '' };
  editarModo: boolean = false;
  usuarioEditandoId: number | null = null;

  // Función para agregar usuario
  agregarUsuario() {
    if (this.nuevoUsuario.nombre && this.nuevoUsuario.correo && this.nuevoUsuario.rol) {
      const id = this.usuarios.length + 1;
      this.usuarios.push({ ...this.nuevoUsuario, id });
      this.nuevoUsuario = { id: 0, nombre: '', correo: '', rol: '' };
    }
  }

  // Función para editar usuario
  editarUsuario(usuario: Usuario) {
    this.editarModo = true;
    this.usuarioEditandoId = usuario.id;
    this.nuevoUsuario = { ...usuario };
  }

  // Guardar edición
  guardarEdicion() {
    if (this.usuarioEditandoId !== null) {
      const index = this.usuarios.findIndex(u => u.id === this.usuarioEditandoId);
      if (index > -1) {
        this.usuarios[index] = { ...this.nuevoUsuario, id: this.usuarioEditandoId };
      }
      this.editarModo = false;
      this.usuarioEditandoId = null;
      this.nuevoUsuario = { id: 0, nombre: '', correo: '', rol: '' };
    }
  }

  // Eliminar usuario
  eliminarUsuario(id: number) {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
  }

  // Cancelar edición
  cancelarEdicion() {
    this.editarModo = false;
    this.usuarioEditandoId = null;
    this.nuevoUsuario = { id: 0, nombre: '', correo: '', rol: '' };
  }
}
