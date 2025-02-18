import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioAdminSelectorUnroutedComponent } from '../../usuario/usuario.admin.selector.unrouted/usuario.admin.selector.unrouted.component';
import { IUsuario } from '../../../model/usuario.interface';
import {
  FormControl,
  FormGroup,  
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IClase } from '../../../model/clase.interface';
import { ClaseService } from '../../../service/clase.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../../../service/usuario.service';

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
  oClase: IClase | null = null;

  strMessage: string = '';
  readonly dialog = inject(MatDialog);
  oUsuario: IUsuario = {} as IUsuario;
  myModal: any;

  form: FormGroup = new FormGroup({});
  //oUsuario: IUsuario | null = null;

 /* oClase: IClase = {
    id: 0,
    asignatura: '',
    precio: 0,
    hora: 0,
    usuario: {
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
};*/

 

  constructor(
    private oClaseService: ClaseService,
    private oRouter: Router,
    private activatedRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService
    ) {}


 ngOnInit() {
    this.createForm();
    if (!this.oClaseForm) {
      console.error("El formulario no se ha inicializado correctamente");
      return;
    }

    if (this.oClaseForm) {
      this.oClaseForm.markAllAsTouched();

      // Verificar que el campo 'tipousuario' existe antes de suscribirse
      const ClaseControl = this.oClaseForm.get('tipousuario');
      if (!ClaseControl) {
        console.error("El control 'usuario' no está definido en el formulario");
        return;
      }

      // Suscripción a los cambios en el campo 'tipousuario'
      this.oClaseForm.controls['Usuario'].valueChanges.subscribe(change => {
        if (change && change.id) {
          // Obtener el objeto tipousuario del servidor
          this.oClaseService.get(change.id).subscribe({
            next: (oClase: IClase) => {
              this.oClase = oClase;
            },
            error: (err: HttpErrorResponse) => {  // Tipo de error especificado
              console.log(err);
              this.oUsuario = {} as IUsuario;
              // Marcar el campo como inválido si hay un error
              if (this.oClaseForm) {
                this.oClaseForm.controls['tipoUsuario'].setErrors({
                  invalid: true,
                });
              }
            }
          });
        } else {
          this.oUsuario = {} as IUsuario;
        }
      });
    }
  }

  getClase(id: number): void {
    this.oClaseService.get(id).subscribe({
      next: (data: IClase) => {
        if (!data.usuario) {
          alert("El usuario es nulo en esta clase");
        } else {
          this.oClase = data;
          this.updateForm(); // Llena el formulario con los datos obtenidos
        }
      },
      error: (error) => {
        console.error('Error obteniendo la clase:', error);
        alert('No se pudo obtener la clase. Verifica que tenga un usuario asignado.');
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
        password: new FormControl(''),
        id_tipousuario: new FormControl([]), 
      }),
    });
  }
 /* updateForm() {
    this.oClaseForm?.controls['asignatura'].setValue('');
    this.oClaseForm?.controls['tipo'].setValue('');
    this.oClaseForm?.controls['precio'].setValue('');
    this.oClaseForm?.controls['hora'].setValue('');
    this.oClaseForm?.controls['id_usuario'].setValue('');
    this.oClaseForm?.controls['id_profesor'].setValue('');
    console.log(this.oClase);
  } */
  
  /*updateForm() {
    if (this.oClaseForm && this.oClase) {
      console.log('Datos de la clase:', this.oClase); // Depuración
      this.oClaseForm.controls['asignatura'].setValue(this.oClase.asignatura);
      this.oClaseForm.controls['precio'].setValue(this.oClase.precio);
      this.oClaseForm.controls['hora'].setValue(this.oClase.hora);
      this.oClaseForm.controls['id_usuario'].setValue(
        {id: null,
          nombre: null,
          apellido1: null,
          apellido2: null,
          email: null,
          password: null,
          tipousuario: {
            id: formData.usuario.id_tipousuario.id,
            descripcion: formData.usuario.id_tipousuario.descripcion
              }
        }
      );
    }
  }*/
  
  /*updateForm() {
    if (this.oClaseForm && this.oClase) {
      console.log('Datos de la clase:', this.oClase); // Depuración
      this.oClaseForm.controls['asignatura'].setValue(this.oClase.asignatura);
      this.oClaseForm.controls['precio'].setValue(this.oClase.precio);
      this.oClaseForm.controls['hora'].setValue(this.oClase.hora);
      
      // Actualizar el grupo 'usuario' usando get() y patchValue:
      if (this.oClase.usuario) {
        this.oClaseForm.get('usuario')?.patchValue({
          id: this.oClase.usuario.id,
          nombre: this.oClase.usuario.nombre,
          apellido1: this.oClase.usuario.apellido1,
          apellido2: this.oClase.usuario.apellido2,
          email: this.oClase.usuario.email,
          password: this.oClase.usuario.password,
          tipousuario: this.oClase.usuario.tipousuario
        });
      } else {
        // Si oClase.usuario es null, puedes reiniciar el grupo para evitar errores
        this.oClaseForm.get('usuario')?.reset();
      }
    }
  }*/

    updateForm() {
      this.oClaseForm?.controls['asignatura'].setValue('');
      this.oClaseForm?.controls['precio'].setValue('');
      this.oClaseForm?.controls['hora'].setValue('');
      this.oClaseForm?.controls['usuario'].setValue({
        id: null,
        nombre: null,
        apellido1: null,
        apellido2: null,
        email: null,
        password: null,
        id_tipousuario: null,
      });
  
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

 /* onSubmit() {
    if (this.oClaseForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {

      const formData = this.oClaseForm!.value;

      const newClase: IClase = {
        id: this.oClase ? this.oClase.id : 0,
        asignatura: formData.asignatura,
        precio: formData.precio,
        hora: formData.hora,
        usuario: {
          id: formData.usuario.id,
          nombre: formData.usuario.nombre,
          apellido1: formData.usuario.apellido1,
          apellido2: formData.usuario.apellido2,
          email: formData.usuario.email,
          password: formData.usuario.password,
          tipousuario: formData.usuario.tipousuario,
        }
      };
        console.log('Datos a enviar:', newClase); // Depuración

      this.oClaseService.create(newClase).subscribe({
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

  showUsuarioSelectorModal() {
    const dialogRef = this.dialog.open(UsuarioAdminSelectorUnroutedComponent, {
      height: '800px',
      maxHeight: '1200px',
      width: '80%',
      maxWidth: '90%',
      data: { origen: '', idBalance: '' },


    });

    dialogRef.afterClosed().subscribe((result: undefined) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oClaseForm?.controls['usuario'].setValue(result);
        this.oUsuario = result;
        //this.animal.set(result);
      }
    });
    return false;
  }*/

     onSubmit() {
        if (this.oClaseForm?.invalid) {
          this.showModal('Formulario inválido');
          return;
        } else {
          this.oClaseService.create(this.oClaseForm?.value).subscribe({
            next: (oClase: IClase) => {
              this.oClase = oClase;
              this.showModal('Clase creado con el id: ' + this.oClase.id);
            },
            error: (err) => {
              this.showModal('Error al crear el clase');
              console.log(err);
            },
          });
        }
      }
      showUsuarioSelectorModal() {
        const dialogRef = this.dialog.open(UsuarioAdminSelectorUnroutedComponent, {
          height: '800px',
          maxHeight: '1200px',
          width: '80%',
          maxWidth: '90%',
          data: { origen: '', idBalance: '' },
    
    
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          if (result !== undefined) {
            console.log(result);
            this.oClaseForm?.controls['usuario'].setValue({
              id: result.id,
              nombre: result.nombre,
              apellido1: result.nombre,
              apellido2: result.nombre,
              email: result.nombre,
              password: result.nombre,
              id_tipousuario: result.id_tipousuario,
            });
          }
        });
        return false;
      }


}
