import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClaseService } from '../../../service/clase.service';
import { IClase } from '../../../model/clase.interface';

import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { MatSelectModule } from '@angular/material/select';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

declare let bootstrap: any;

@Component({
  selector: 'app-clase-admin-edit-routed',
  templateUrl: './clase.admin.edit.routed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    MatSelectModule,
  ],
})
export class ClaseAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oClaseForm: FormGroup | undefined = undefined;
  oClase: IClase | null = null;
  message: string = '';

  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oClaseService: ClaseService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oClaseForm?.markAllAsTouched();
  }

  createForm() {
    this.oClaseForm = new FormGroup({
      asignatura: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      tipo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      precio: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d{1,4}(\\.\\d{1,2})?$'),
      ]),
      hora: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d{1,2}(\\.\\d{1,2})?$'),
      ]),
      id_alumno: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d+$'),
      ]),
      id_profesor: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d+$'),
      ]),
    });
  }

  onReset() {
    this.oClaseService.get(this.id).subscribe({
      next: (oClase: IClase) => {
        this.oClase = oClase;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oClaseForm?.controls['asignatura'].setValue(this.oClase?.asignatura);
    this.oClaseForm?.controls['tipo'].setValue(this.oClase?.tipo);
    this.oClaseForm?.controls['precio'].setValue(this.oClase?.precio);
    this.oClaseForm?.controls['hora'].setValue(this.oClase?.hora);
    this.oClaseForm?.controls['id_alumno'].setValue(this.oClase?.alumno?.id); 
    this.oClaseForm?.controls['id_profesor'].setValue(this.oClase?.profesor?.id);
  }

  get() {
    this.oClaseService.get(this.id).subscribe({
      next: (oClase: IClase) => {
        this.oClase = oClase;
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
    this.oRouter.navigate(['/admin/clase/view/' + this.oClase?.id]);
  };

  onSubmit() {
    if (!this.oClaseForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oClaseService.update(this.oClaseForm?.value).subscribe({
        next: (oClase: IClase) => {
          this.oClase = oClase;
          this.updateForm();
          this.showModal('Clase ' + this.oClase.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el Clase');
          console.error(error);
        },
      });
    }
  }
}
