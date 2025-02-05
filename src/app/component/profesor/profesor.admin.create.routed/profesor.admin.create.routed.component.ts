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
import { IProfesor } from '../../../model/profesor.interface';
import { ProfesorService } from '../../../service/profesor.service';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-profesor.admin.create.routed',
  templateUrl: './profesor.admin.create.routed.component.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./profesor.admin.create.routed.component.css'],
})
export class ProfesorAdminCreateRoutedComponent implements OnInit {

  id: number = 0;
  oProfesorForm: FormGroup | undefined = undefined;
  oProfesor: IProfesor | null = null;
  strMessage: string = '';

  myModal: any;

  form: FormGroup = new FormGroup({});

  constructor(
    private oProfesorService: ProfesorService,
    private oRouter: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.oProfesorForm?.markAllAsTouched();
  }

  createForm() {
    this.oProfesorForm = new FormGroup({
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
    this.oProfesorForm?.controls['nombre'].setValue('');
    this.oProfesorForm?.controls['apellido1'].setValue('');
    this.oProfesorForm?.controls['apellido2'].setValue('');
    this.oProfesorForm?.controls['email'].setValue('');
    this.oProfesorForm?.controls['telefono'].setValue('');
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
    this.oRouter.navigate(['/admin/profesor/view/' + this.oProfesor?.id]);
  }

  onSubmit() {
    if (this.oProfesorForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {      
      this.oProfesorService.create(this.oProfesorForm?.value).subscribe({
        next: (oProfesor: IProfesor) => {
          this.oProfesor = oProfesor;
          this.showModal('Profesor creado con el id: ' + this.oProfesor.id);
        },
        error: (err) => {
          this.showModal('Error al crear el usuario');
          console.log(err);
        },
      });
    }
  }



}
