import { Component, inject, OnInit } from '@angular/core';
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
import { IUsuario } from '../../../model/usuario.interface';
import { UsuarioService } from '../../../service/usuario.service';
import { TipousuarioselectorComponent } from '../../tipousuario/tipousuarioselector/tipousuarioselector.component';
import { ITipoUsuario } from '../../../model/tipoUsuario.interface';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoUsuarioService } from '../../../service/tipousuario.service';


declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-usuario.create',
  templateUrl: './usuario.create.component.html',
  styleUrls: ['./usuario.create.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,

  ],

})
export class UsuarioCreateComponent implements OnInit {

  id: number = 0;
  oUsuarioForm: FormGroup | undefined = undefined;
  oUsuario: IUsuario | null = null;
  
  strMessage: string = '';
  readonly dialog = inject(MatDialog);
  oTipoUsuario: ITipoUsuario = {} as ITipoUsuario;
  myModal: any;

  form: FormGroup = new FormGroup({});


  constructor(
    private oUsuarioService: UsuarioService,
    private oRouter: Router,
    private oTipoUsuarioService: TipoUsuarioService

  ) { }


  ngOnInit() {
    this.createForm();
    if (!this.oUsuarioForm) {
      console.error("El formulario no se ha inicializado correctamente");
      return;
    }

    if (this.oUsuarioForm) {
      this.oUsuarioForm.markAllAsTouched();

      // Verificar que el campo 'tipousuario' existe antes de suscribirse
      const tipoUsuarioControl = this.oUsuarioForm.get('tipousuario');
      if (!tipoUsuarioControl) {
        console.error("El control 'tipousuario' no está definido en el formulario");
        return;
      }

      // Suscripción a los cambios en el campo 'tipousuario'
      this.oUsuarioForm.controls['tipoUsuario'].valueChanges.subscribe(change => {
        if (change && change.id) {
          // Obtener el objeto tipousuario del servidor
          this.oTipoUsuarioService.get(change.id).subscribe({
            next: (oTipoUsuario: ITipoUsuario) => {
              this.oTipoUsuario = oTipoUsuario;
            },
            error: (err: HttpErrorResponse) => {  // Tipo de error especificado
              console.log(err);
              this.oTipoUsuario = {} as ITipoUsuario;
              // Marcar el campo como inválido si hay un error
              if (this.oUsuarioForm) {
                this.oUsuarioForm.controls['tipoUsuario'].setErrors({
                  invalid: true,
                });
              }
            }
          });
        } else {
          this.oTipoUsuario = {} as ITipoUsuario;
        }
      });
    }
  }

  createForm() {
    this.oUsuarioForm = new FormGroup({
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
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      tipousuario: new FormGroup({
        id: new FormControl('', Validators.required), // ID de tipocuenta
        descripcion: new FormControl(''), // Descripción de tipocuenta
      }),
    });
  }

  updateForm() {
    this.oUsuarioForm?.controls['nombre'].setValue('');
    this.oUsuarioForm?.controls['apellido1'].setValue('');
    this.oUsuarioForm?.controls['apellido2'].setValue('');
    this.oUsuarioForm?.controls['email'].setValue('');
    this.oUsuarioForm?.controls['password'].setValue('');
    this.oUsuarioForm?.controls['tipousuario'].setValue({
      id: null,
      descripcion: null,
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
    this.oRouter.navigate(['/admin/usuario/view/' + this.oUsuario?.id]);
  }

  onSubmit() {
    if (this.oUsuarioForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oUsuarioService.create(this.oUsuarioForm?.value).subscribe({
        next: (oUsuario: IUsuario) => {
          this.oUsuario = oUsuario;
          this.showModal('Usuario creado con el id: ' + this.oUsuario.id);
        },
        error: (err) => {
          this.showModal('Error al crear el usuario');
          console.log(err);
        },
      });
    }
  }
  showTipoUsuarioSelectorModal() {
    const dialogRef = this.dialog.open(TipousuarioselectorComponent, {
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
        this.oUsuarioForm?.controls['tipousuario'].setValue({
          id: result.id,
          descripcion: result.descripcion,
        });
      }
    });
    return false;
  }



}
