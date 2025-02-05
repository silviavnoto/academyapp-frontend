import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,  
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IAlumno } from '../../../model/alumno.interface';
import { AlumnoService } from '../../../service/alumno.service';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-alumno.admin.create.routed',
  templateUrl: './alumno.admin.create.routed.component.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./alumno.admin.create.routed.component.css'],
})
export class AlumnoAdminCreateRoutedComponent implements OnInit {

  id: number = 0;
  oAlumnoForm: FormGroup | undefined = undefined;
  oAlumno: IAlumno | null = null;
  strMessage: string = '';

  myModal: any;

  form: FormGroup = new FormGroup({});

  constructor(
    private oAlumnoService: AlumnoService,
    private oRouter: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.oAlumnoForm?.markAllAsTouched();
  }

  createForm() {
    this.oAlumnoForm = new FormGroup({
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
      apellido2: new FormControl(''),
      email: new FormControl('', [
        Validators.required, 
        Validators.email]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern('^[679]\\d{8}$'), // Validación para teléfono
      ]),
    });
  }

  updateForm() {
    this.oAlumnoForm?.controls['nombre'].setValue('');
    this.oAlumnoForm?.controls['apellido1'].setValue('');
    this.oAlumnoForm?.controls['apellido2'].setValue('');
    this.oAlumnoForm?.controls['email'].setValue('');
    this.oAlumnoForm?.controls['telefono'].setValue('');
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
    this.oRouter.navigate(['/admin/alumno/view/' + this.oAlumno?.id]);
  }

  onSubmit() {
    if (this.oAlumnoForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {      
      this.oAlumnoService.create(this.oAlumnoForm?.value).subscribe({
        next: (oAlumno: IAlumno) => {
          this.oAlumno = oAlumno;
          this.showModal('Alumno creado con el id: ' + this.oAlumno.id);
        },
        error: (err) => {
          this.showModal('Error al crear el usuario');
          console.log(err);
        },
      });
    }
  }



}
