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
  myModal: any;

  constructor(
    private oUsuarioService: UsuarioService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
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
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  delete(): void {
    this.oUsuarioService.delete(this.oUsuario!.id).subscribe({
      next: (data) => {
        console.log(data);
        this.showModal(
          'Usuario con id ' + this.oUsuario!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el usuario');
        console.error(error);
      },
    });
  }

  cancel(): void {
    this.oRouter.navigate(['/admin/usuario/plist']);
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/usuario/plist']);
  };
}
