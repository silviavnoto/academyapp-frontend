import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlquilerService } from '../../../service/alquiler.service';
import { IAlquiler } from '../../../model/alquiler.interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CalendarModule } from 'primeng/calendar';
import { CALENDAR_ES } from '../../../environment/environment';
import { PrimeNGConfig } from 'primeng/api';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-alquiler-admin-edit-routed',
  templateUrl: './alquiler.admin.edit.routed.component.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    CalendarModule
  ],
})
export class AlquilerAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oAlquilerForm: FormGroup | undefined = undefined;
  oAlquiler: IAlquiler = {} as IAlquiler;
  message: string = '';

  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oAlquilerService: AlquilerService,
    private oRouter: Router,
    private primengConfig: PrimeNGConfig,
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oAlquilerForm?.markAllAsTouched();
    this.primengConfig.setTranslation(CALENDAR_ES);
  }

  createForm() {
    this.oAlquilerForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      inicio: new FormControl(new Date(), [
        Validators.required
      ,
      ]),
      fin: new FormControl(new Date(), [
        Validators.required
      ,
      ]),
      precio: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d{1,4}(\\.\\d{1,2})?$'),
      ]),
      id_alumno: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d+$'),
      ]),
      id_taquilla: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d+$'),
      ]),
    });
  }

  onReset() {
    this.oAlquilerService.get(this.id).subscribe({
      next: (oAlquiler: IAlquiler) => {
        this.oAlquiler = oAlquiler;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oAlquilerForm?.controls['id'].setValue(this.oAlquiler?.id);
    this.oAlquilerForm?.controls['inicio'].setValue(new Date(this.oAlquiler!.inicio));
    this.oAlquilerForm?.controls['fin'].setValue(new Date(this.oAlquiler!.fin));
    this.oAlquilerForm?.controls['precio'].setValue(this.oAlquiler?.precio);
    this.oAlquilerForm?.controls['id_alumno'].setValue(this.oAlquiler?.alumno.id);
    this.oAlquilerForm?.controls['id_taquilla'].setValue(this.oAlquiler?.taquilla.id);
    console.log(this.oAlquiler);
  }

  get() {
    this.oAlquilerService.get(this.id).subscribe({
      next: (oAlquiler: IAlquiler) => {
        this.oAlquiler = oAlquiler;
        this.oAlquiler.inicio = new Date(oAlquiler.inicio); // Convierte a Date
        this.oAlquiler.fin = new Date(oAlquiler.fin);       // Convierte a Date
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
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

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/alquiler/view/' + this.oAlquiler?.id]);
  };

  onSubmit() {
    if (!this.oAlquilerForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      const formData = { ...this.oAlquilerForm?.value };

    // Convertir fechas a formato ISO si son de tipo Date
    formData.inicio = formData.inicio instanceof Date ? formData.inicio.toISOString() : formData.inicio;
    formData.fin = formData.fin instanceof Date ? formData.fin.toISOString() : formData.fin;
    
      this.oAlquilerService.update(this.oAlquilerForm?.value).subscribe({
        next: (oAlquiler: IAlquiler) => {
          this.oAlquiler = oAlquiler;
          this.updateForm();
          this.showModal('Alquiler ' + this.oAlquiler.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el Alquiler');
          console.error(error);
        },
      });
    }
  }
}
