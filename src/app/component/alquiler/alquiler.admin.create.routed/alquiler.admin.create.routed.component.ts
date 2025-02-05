import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IAlquiler } from '../../../model/alquiler.interface';
import { AlquilerService } from '../../../service/alquiler.service';
import { CalendarModule } from 'primeng/calendar';
import { CALENDAR_ES } from '../../../environment/environment';
import { PrimeNGConfig } from 'primeng/api';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-alquiler.admin.create.routed',
  templateUrl: './alquiler.admin.create.routed.component.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    CalendarModule
  ],
  styleUrls: ['./alquiler.admin.create.routed.component.css'],
})
export class AlquilerAdminCreateRoutedComponent implements OnInit {

  id: number = 0;
  oAlquilerForm: FormGroup | undefined = undefined;
  oAlquiler: IAlquiler | null = null;
  strMessage: string = '';

  myModal: any;

  form: FormGroup = new FormGroup({});

  constructor(
    private oAlquilerService: AlquilerService,
    private oRouter: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.oAlquilerForm?.markAllAsTouched();
  }

  createForm() {
    this.oAlquilerForm = new FormGroup({
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

  updateForm() {
    this.oAlquilerForm?.controls['inicio'].setValue('');
    this.oAlquilerForm?.controls['fin'].setValue('');
    this.oAlquilerForm?.controls['precio'].setValue('');
    this.oAlquilerForm?.controls['id_alumno'].setValue('');
    this.oAlquilerForm?.controls['id_taquilla'].setValue('');
    console.log(this.oAlquiler);
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  onReset() {
    this.updateForm();
    return false;
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/alquiler/view/' + this.oAlquiler?.id]);
  }

  // Método para convertir fechas a ISO
formatDateToISO(date: Date): string {
  return date.toISOString();
}
  
  onSubmit() {
    if (this.oAlquilerForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {

     // Clonar los valores del formulario
    const formData = { ...this.oAlquilerForm?.value };

    // Convertir las fechas de tipo Date a formato ISO antes de enviarlas al backend
    formData.inicio = new Date(this.oAlquilerForm?.value?.inicio).toISOString();
    formData.fin = new Date(this.oAlquilerForm?.value?.fin).toISOString();
      
      this.oAlquilerService.create(this.oAlquilerForm?.value).subscribe({
        next: (oAlquiler: IAlquiler) => {
          this.oAlquiler = oAlquiler;
          this.showModal('Alquiler creado con el id: ' + this.oAlquiler.id);
        },
        error: (err) => {
          this.showModal('Error al crear el Alquiler');
          console.log(err);
        },
      });
    }
  }



}
