import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { IUsuario } from '../../../model/usuario.interface';
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
  selector: 'app-usuario.admin.edit.routed',
  templateUrl: './usuario.admin.edit.routed.component.html',
  styleUrls: ['./usuario.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class UsuarioAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  usuarioForm: FormGroup | undefined = undefined;
  oUsuario: IUsuario | null = null;
  message="";

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
  }

  createForm() {
    this.usuarioForm = new FormGroup({
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
      apellido2: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onReset() {
    this.oUsuarioService.get(this.id).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oUsuario = oUsuario;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.usuarioForm?.controls['id'].setValue(this.oUsuario?.id);
    this.usuarioForm?.controls['nombre'].setValue(this.oUsuario?.nombre);
    this.usuarioForm?.controls['apellido1'].setValue(this.oUsuario?.apellido1);
    this.usuarioForm?.controls['apellido2'].setValue(this.oUsuario?.apellido2);
    this.usuarioForm?.controls['email'].setValue(this.oUsuario?.email);
  }

  get() {
    this.oUsuarioService.get(this.id).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oUsuario = oUsuario;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  showModal(mensaje: string) {
    this.message = mensaje;
    let myModal = new bootstrap.Modal(document.getElementById('mimodal'), { 
      keyboard: false
    })      
    myModal.show()
  }

  onSubmit() {
    if (!this.usuarioForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oUsuarioService.update(this.usuarioForm?.value).subscribe({
        next: (oUsuario: IUsuario) => {
          this.oUsuario = oUsuario;
          this.updateForm();
          this.showModal('Usuario actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el usuario');
          console.error(error);
        },
      });
    }
  }
}
