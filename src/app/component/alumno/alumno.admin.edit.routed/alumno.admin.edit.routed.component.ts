import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlumnoService } from '../../../service/alumno.service';
import { IAlumno } from '../../../model/alumno.interface';
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
  selector: 'app-alumno-admin-edit-routed',
  templateUrl: './alumno.admin.edit.routed.component.html',
  styleUrls: ['./alumno.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class AlumnoAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oAlumnoForm: FormGroup | undefined = undefined;
  oAlumno: IAlumno | null = null;
  message: string = '';

  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oAlumnoService: AlumnoService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oAlumnoForm?.markAllAsTouched();
  }

  createForm() {
    this.oAlumnoForm = new FormGroup({
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
    this.oAlumnoService.get(this.id).subscribe({
      next: (oAlumno: IAlumno) => {
        this.oAlumno = oAlumno;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oAlumnoForm?.controls['id'].setValue(this.oAlumno?.id);
    this.oAlumnoForm?.controls['nombre'].setValue(this.oAlumno?.nombre);
    this.oAlumnoForm?.controls['apellido1'].setValue(this.oAlumno?.apellido1);
    this.oAlumnoForm?.controls['apellido2'].setValue(this.oAlumno?.apellido2);
    this.oAlumnoForm?.controls['email'].setValue(this.oAlumno?.email);
    this.oAlumnoForm?.controls['telefono'].setValue(this.oAlumno?.telefono);
  }

  get() {
    this.oAlumnoService.get(this.id).subscribe({
      next: (oAlumno: IAlumno) => {
        this.oAlumno = oAlumno;
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
    this.oRouter.navigate(['/admin/alumno/view/' + this.oAlumno?.id]);
  };

  onSubmit() {
    if (!this.oAlumnoForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oAlumnoService.update(this.oAlumnoForm?.value).subscribe({
        next: (oAlumno: IAlumno) => {
          this.oAlumno = oAlumno;
          this.updateForm();
          this.showModal('Alumno ' + this.oAlumno.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el alumno');
          console.error(error);
        },
      });
    }
  }
}
