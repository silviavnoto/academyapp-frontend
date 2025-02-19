import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUsuario } from '../../../../model/usuario.interface';
import { UsuarioService } from '../../../../service/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { IClase } from '../../../../model/clase.interface';
import { ClaseService } from '../../../../service/clase.service';
import { UsuarioselectorComponent } from '../../../admin/usuario/usuarioselector/usuarioselector.component';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-profesor.clase.create',
  templateUrl: './profesor.clase.create.component.html',
  styleUrls: ['./profesor.clase.create.component.css'],
  imports: [
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      ReactiveFormsModule,
      RouterModule,
  
    ],
})
export class ProfesorClaseCreateComponent implements OnInit {


  id: number = 0;
  oClaseForm: FormGroup | undefined = undefined;
  oClase: IClase | null = null;
  
  strMessage: string = '';
  readonly dialog = inject(MatDialog);
  oUsuario: IUsuario = {} as IUsuario;
  myModal: any;

  form: FormGroup = new FormGroup({});

    
  constructor(
    @Inject(ClaseService) 
    private oClaseService: ClaseService,
    private oRouter: Router,
    private oUsuarioService: UsuarioService

  ) { }


  ngOnInit() {
    console.log("Formulario de creación de clase cargado");
    this.createForm();
    if (!this.oClaseForm) {
      console.error("El formulario no se ha inicializado correctamente");
      return;
    }

    if (this.oClaseForm) {
      this.oClaseForm.markAllAsTouched();

      // Verificar que el campo 'tipousuario' existe antes de suscribirse
      const usuarioControl = this.oClaseForm.get('usuario');
      if (!usuarioControl) {
        console.error("El control 'usuario' no está definido en el formulario");
        return;
      }

      // Suscripción a los cambios en el campo 'tipousuario'
      this.oClaseForm.controls['usuario'].valueChanges.subscribe(change => {
        if (change && change.id) {
          // Obtener el objeto tipousuario del servidor
          this.oUsuarioService.get(change.id).subscribe({
            next: (oUsuario: IUsuario) => {
              this.oUsuario = oUsuario;
            },
            error: (err: HttpErrorResponse) => {  // Tipo de error especificado
              console.log(err);
              this.oUsuario = {} as IUsuario;
              // Marcar el campo como inválido si hay un error
              if (this.oClaseForm) {
                this.oClaseForm.controls['usuario'].setErrors({
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
        tipousuario: new FormControl(''), 
      }),
    });
  }

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
      tipousuario: null,
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
    this.oRouter.navigate(['/admin/usuario/view/' + this.oClase?.id]);
  }

  onSubmit() {
    if (this.oClaseForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      console.log(this.oClaseForm?.value)
      this.oClaseService.create(this.oClaseForm?.value).subscribe({
        next: (oClase: IClase) => {
          this.oClase = oClase;
          this.showModal('Usuario creado con el id: ' + this.oClase.id);
        },
        error: (err) => {
          this.showModal('Error al crear el usuario');
          console.log(err);
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

