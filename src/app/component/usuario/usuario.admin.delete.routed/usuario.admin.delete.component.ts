import { Component } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario.admin.delete',
  standalone: true,
  imports: [],
  templateUrl: './usuario.admin.delete.component.html',
  styleUrl: './usuario.admin.delete.component.css',
})
export class UsuarioAdminDeleteRoutedComponent {
  id: number = 0;
  nombre: string = '';
  apellido1: string = '';
  apellido2: string = '';
  email: string = '';

  constructor(
    private oUsuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.oUsuarioService.get(this.id).subscribe((usuario) => {
      this.nombre = usuario.nombre;
      this.apellido1 = usuario.apellido1;
      this.apellido2 = usuario.apellido2;
      this.email = usuario.email;
    });
  }

  delete(): void {
    this.oUsuarioService.delete(this.id).subscribe({
      next: (data) => {
        console.log(data);
        alert('Usuario eliminado');
        this.router.navigate(['/admin/usuario/plist']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/usuario/plist']);
  }
}
