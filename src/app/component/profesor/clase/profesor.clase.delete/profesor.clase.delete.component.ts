import { Component, OnInit } from '@angular/core';
import { ClaseService } from '../../../../service/clase.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IClase } from '../../../../model/clase.interface';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

declare let bootstrap: any;

@Component({
  selector: 'app-profesor.clase.delete',
  standalone: true,
  templateUrl: './profesor.clase.delete.component.html',
  styleUrls: ['./profesor.clase.delete.component.css'],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class ProfesorClaseDeleteComponent implements OnInit {

   oClase: IClase | null = null;
    strMessage: string = '';
    myModal: any;
  
    constructor(
      private oClaseService: ClaseService,
      private oActivatedRoute: ActivatedRoute,
      private oRouter: Router
    ) {}
  
    ngOnInit(): void {
      let id = this.oActivatedRoute.snapshot.params['id'];
      this.oClaseService.get(id).subscribe({
        next: (oClase: IClase) => {
          this.oClase = oClase;
        },
        error: (err) => {
          this.showModal('Error al cargar el Clase');
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
      this.oClaseService.delete(this.oClase!.id).subscribe({
        next: (data) => {
          this.showModal(
            'Clase con id ' + this.oClase!.id + ' ha sido borrada'
          );
        },
        error: (error) => {
          this.showModal('Error al borrar la Clase');
        },
      });
    }
  
    hideModal = () => {
      this.myModal.hide();
      this.oRouter.navigate(['/profesor/clase/plist']);
    }
    
  }
  
