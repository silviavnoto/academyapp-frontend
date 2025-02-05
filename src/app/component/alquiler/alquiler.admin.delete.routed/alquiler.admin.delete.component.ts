import { Component, OnInit } from '@angular/core';
import { AlquilerService } from '../../../service/alquiler.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IAlquiler } from '../../../model/alquiler.interface';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-alquiler-admin-delete-routed',
  templateUrl: './alquiler.admin.delete.component.html',
  imports: [RouterModule],
})
export class AlquilerAdminDeleteRoutedComponent implements OnInit {
  oAlquiler: IAlquiler | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oAlquilerService: AlquilerService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oAlquilerService.get(id).subscribe({
      next: (oAlquiler: IAlquiler) => {
        this.oAlquiler = oAlquiler;
      },
      error: (err) => {
        this.showModal('Error al cargar el Alquiler');
      },
    });
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  delete(): void {
    this.oAlquilerService.delete(this.oAlquiler!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Alquiler con id ' + this.oAlquiler!.id + ' ha sido borrada'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar la Alquiler');
      },
    });
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/alquiler/plist']);
  }
  
}
