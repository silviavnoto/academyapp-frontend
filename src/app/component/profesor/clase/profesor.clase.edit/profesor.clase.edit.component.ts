import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClaseService } from '../../../../service/clase.service';
import { IClase } from '../../../../model/clase.interface';
import { UsuarioselectorComponent } from '../../../admin/usuario/usuarioselector/usuarioselector.component';
import { MatDialog } from '@angular/material/dialog';

declare let bootstrap: any;

@Component({
  selector: 'app-profesor.clase.edit',
  templateUrl: './profesor.clase.edit.component.html',
  styleUrls: ['./profesor.clase.edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
  ],
})
export class ProfesorClaseEditComponent implements OnInit {
   id: number = 0;
    oClaseForm: FormGroup | undefined = undefined;
    oClase: IClase | null = null;

    message: string = '';
  readonly dialog = inject(MatDialog);
    myModal: any;


  constructor(
      private oActivatedRoute: ActivatedRoute,
      @Inject(ClaseService) private oClaseService: ClaseService,
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
      this.id = Number(this.oActivatedRoute.snapshot.paramMap.get('id'));
    console.log('ID recibido:', this.id);
    }
  
    createForm() {
      this.oClaseForm = new FormGroup({
        id: new FormControl('', [Validators.required]),
        asignatura: new FormControl('', [
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
        usuario: new FormGroup({
          id: new FormControl('', Validators.required), 
          nombre: new FormControl(''), 
          apellido1: new FormControl(''), 
          apellido2: new FormControl(''), 
          email: new FormControl(''), 
          tipousuario: new FormControl(''), 
        }),
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
  this.oClaseForm?.controls['id'].setValue(this.oClase?.id);
    this.oClaseForm?.controls['asignatura'].setValue('');
    this.oClaseForm?.controls['precio'].setValue('');
    this.oClaseForm?.controls['hora'].setValue('');
    this.oClaseForm?.controls['usuario'].setValue({
      id: null,
      nombre: null,
      apellido1: null,
      apellido2: null,
      email: null,
      tipousuario: null,
    });

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
        console.log(this.oClaseForm?.value)
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
     showUsuarioSelectorModal() {
        const dialogRef = this.dialog.open(UsuarioselectorComponent, {
          height: '800px',
          maxHeight: '1200px',
          width: '80%',
          maxWidth: '90%',
          data: { origen: '', idBalance: '' },
    
    
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined) {
            console.log("Usuario seleccionado:", result);
    
            const newUser = {
              id : result.id,
              nombre: result.nombre,
              apellido1: result.apellido1,
              apellido2: result.apellido2,
              email: result.email,
              tipousuario: {
                id: result.tipousuario.id
              }
            }
      
            // Asignar solo el ID al campo usuario.id en el formulario
            this.oClaseForm?.get('usuario')?.setValue(newUser);
          }
        });
      
        return false;
      }
    
    
  }
  
