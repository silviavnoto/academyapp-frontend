import { Component, OnInit } from '@angular/core';
import { ProfesorService } from '../../../service/profesor.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IProfesor } from '../../../model/profesor.interface';

declare let bootstrap: any;

@Component({
  selector: 'app-profesor-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profesor.admin.delete.component.html',
  styleUrl: './profesor.admin.delete.component.css',
})
export class ProfesorAdminDeleteRoutedComponent implements OnInit {
  oProfesor: IProfesor | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oProfesorService: ProfesorService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oProfesorService.get(id).subscribe({
      next: (oProfesor: IProfesor) => {
        this.oProfesor = oProfesor;
      },
      error: (err) => {
        this.showModal('Error al cargar el profesor');
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
    this.oProfesorService.delete(this.oProfesor!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Profesor con id ' + this.oProfesor!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el Profesor');
      },
    });
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/profesor/plist']);
  }
  
}
