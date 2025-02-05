import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { IClase } from '../../../model/clase.interface';
import { ClaseService } from '../../../service/clase.service';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-clase.admin.create.routed',
  templateUrl: './clase.admin.create.routed.component.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./clase.admin.create.routed.component.css'],
})
export class ClaseAdminCreateRoutedComponent implements OnInit {

  id: number = 0;
  oClaseForm: FormGroup | undefined = undefined;
  //oClase: IClase | null = null;
  oClase: IClase = {
    id: 0,
    asignatura: '',
    tipo: '',
    precio: 0,
    hora: 0,
    alumno: {
      id: 0,
      nombre: '',
      apellido1: '',
      apellido2: '',
      email: '',
      telefono: ''
    },
    profesor: {
      id: 0,
      nombre: '',
      apellido1: '',
      apellido2: '',
      email: '',
      telefono: ''
    }
};

  //oClase: IClase = {} as IClase;
  strMessage: string = '';

  myModal: any;

  form: FormGroup = new FormGroup({});

  constructor(
    private oClaseService: ClaseService,
    private oRouter: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.createForm();
    
    if (this.id) {
      this.getClase(this.id); // Llama a la API para obtener la clase
    }
    this.oClaseForm?.markAllAsTouched();
  }

  getClase(id: number): void {
    this.oClaseService.get(id).subscribe({
      next: (data: IClase) => {
        if (!data.alumno) {
          alert("El alumno es nulo en esta clase");
        } else {
          this.oClase = data;
          this.updateForm(); // Llena el formulario con los datos obtenidos
        }
      },
      error: (error) => {
        console.error('Error obteniendo la clase:', error);
        alert('No se pudo obtener la clase. Verifica que tenga un alumno asignado.');
      }
    });
  }

  createForm() {
    this.oClaseForm = new FormGroup({
      asignatura: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      tipo: new FormControl('', [Validators.required]),
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
        Validators.min(1),
      ]),
      id_profesor: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }
 /* updateForm() {
    this.oClaseForm?.controls['asignatura'].setValue('');
    this.oClaseForm?.controls['tipo'].setValue('');
    this.oClaseForm?.controls['precio'].setValue('');
    this.oClaseForm?.controls['hora'].setValue('');
    this.oClaseForm?.controls['id_alumno'].setValue('');
    this.oClaseForm?.controls['id_profesor'].setValue('');
    console.log(this.oClase);
  } */
  
  updateForm() {
    if (this.oClaseForm && this.oClase) {
      this.oClaseForm.controls['asignatura'].setValue(this.oClase.asignatura);
      this.oClaseForm.controls['tipo'].setValue(this.oClase.tipo);
      this.oClaseForm.controls['precio'].setValue(this.oClase.precio);
      this.oClaseForm.controls['hora'].setValue(this.oClase.hora);
      this.oClaseForm.controls['id_alumno'].setValue(this.oClase.alumno?.id || '');
      this.oClaseForm.controls['id_profesor'].setValue(this.oClase.profesor?.id || '');
    }
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
    this.oRouter.navigate(['/admin/clase/view/' + this.oClase?.id]);
  }

  onSubmit() {
    if (this.oClaseForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      const formData = this.oClaseForm?.value;

      const body = {
        asignatura: formData.asignatura,
        tipo: formData.tipo,
        precio: formData.precio,
        hora: formData.hora,
        alumno: { id: formData.id_alumno },
        profesor: { id: formData.id_profesor }
      };
  
      console.log('Datos enviados:', body);
   //   console.log('Datos enviados anteriores:', this.oClaseForm?.value);

      this.oClaseService.create(this.oClaseForm?.value).subscribe({
        next: (oClase: IClase) => {
          this.oClase = oClase;
          this.showModal('Clase creada con el id: ' + this.oClase.id);
        },
        error: (err) => {
          this.showModal('Error al crear la clase');
          console.log(err);
        },
      });
    }
  }



}
