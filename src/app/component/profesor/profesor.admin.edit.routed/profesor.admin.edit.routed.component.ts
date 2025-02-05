import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfesorService } from '../../../service/profesor.service';
import { IProfesor } from '../../../model/profesor.interface';
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
  selector: 'app-profesor-admin-edit-routed',
  templateUrl: './profesor.admin.edit.routed.component.html',
  styleUrls: ['./profesor.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ProfesorAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oProfesorForm: FormGroup | undefined = undefined;
  oProfesor: IProfesor | null = null;
  message: string = '';

  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oProfesorService: ProfesorService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oProfesorForm?.markAllAsTouched();
  }

  createForm() {
    this.oProfesorForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellido1: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellido2: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern('^[679]\\d{8}$'), // Validación para teléfono
      ]),
    });
  }

  onReset() {
    this.oProfesorService.get(this.id).subscribe({
      next: (oProfesor: IProfesor) => {
        this.oProfesor = oProfesor;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oProfesorForm?.controls['id'].setValue(this.oProfesor?.id);
    this.oProfesorForm?.controls['nombre'].setValue(this.oProfesor?.nombre);
    this.oProfesorForm?.controls['apellido1'].setValue(this.oProfesor?.apellido1);
    this.oProfesorForm?.controls['apellido2'].setValue(this.oProfesor?.apellido2);
    this.oProfesorForm?.controls['email'].setValue(this.oProfesor?.email);
    this.oProfesorForm?.controls['telefono'].setValue(this.oProfesor?.telefono);
  }

  get() {
    this.oProfesorService.get(this.id).subscribe({
      next: (oProfesor: IProfesor) => {
        this.oProfesor = oProfesor;
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
    this.oRouter.navigate(['/admin/profesor/view/' + this.oProfesor?.id]);
  };

  onSubmit() {
    if (!this.oProfesorForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oProfesorService.update(this.oProfesorForm?.value).subscribe({
        next: (oProfesor: IProfesor) => {
          this.oProfesor = oProfesor;
          this.updateForm();
          this.showModal('Profesor ' + this.oProfesor.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el Profesor');
          console.error(error);
        },
      });
    }
  }
}
