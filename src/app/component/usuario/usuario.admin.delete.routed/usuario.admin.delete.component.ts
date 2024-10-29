import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IUsuario } from '../../../model/usuario.interface';

declare let bootstrap: any;

@Component({
  selector: 'app-usuario-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './usuario.admin.delete.component.html',
  styleUrl: './usuario.admin.delete.component.css',
})
export class UsuarioAdminDeleteRoutedComponent implements OnInit {
  oUsuario: IUsuario | null = null;

  message: string = '';

  constructor(
    private oUsuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.oUsuarioService.get(id).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oUsuario = oUsuario;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showModal(mensaje: string) {
    this.message = mensaje;
    let myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    myModal.show();
  }

  delete(): void {
    this.oUsuarioService.delete(this.oUsuario!.id).subscribe({
      next: (data) => {
        console.log(data);
        this.showModal(
          'Usuario con id ' + this.oUsuario!.id + ' ha sido borrado'
        );
        this.router.navigate(['/admin/usuario/plist']);
      },
      error: (error) => {
        this.showModal('Error al borrar el usuario');
        console.error(error);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/usuario/plist']);
  }
}
