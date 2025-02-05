import { Component, OnInit } from '@angular/core';
import { TaquillaService } from '../../../service/taquilla.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ITaquilla } from '../../../model/taquilla.interface';

declare let bootstrap: any;

@Component({
  selector: 'app-taquilla-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './taquilla.admin.delete.component.html',
  styleUrl: './taquilla.admin.delete.component.css',
})
export class TaquillaAdminDeleteRoutedComponent implements OnInit {
  oTaquilla: ITaquilla | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oTaquillaService: TaquillaService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oTaquillaService.get(id).subscribe({
      next: (oTaquilla: ITaquilla) => {
        this.oTaquilla = oTaquilla;
      },
      error: (err) => {
        this.showModal('Error al cargar el Taquilla');
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
    this.oTaquillaService.delete(this.oTaquilla!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Taquilla con id ' + this.oTaquilla!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el Taquilla');
      },
    });
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/taquilla/plist']);
  }
  
}
