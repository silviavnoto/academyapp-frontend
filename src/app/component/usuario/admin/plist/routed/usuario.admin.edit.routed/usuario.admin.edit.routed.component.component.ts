import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../../../service/usuario.service';
import { IUsuario } from '../../../../../../model/usuario.interface';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-usuario.admin.edit.routed.component',
  templateUrl: './usuario.admin.edit.routed.component.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  styleUrls: ['./usuario.admin.edit.routed.component.component.css'],
})
export class UsuarioAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oUsuario: IUsuario | undefined = undefined;
  usuarioForm: FormGroup | undefined = undefined;
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
    this.usuarioForm?.controls['id'].setValue(this.id);
  }

  updateForm() {
    this.usuarioForm?.controls['nombre'].setValue(this.oUsuario?.nombre);
    this.usuarioForm?.controls['apellido1'].setValue(this.oUsuario?.apellido1);
    this.usuarioForm?.controls['apellido2'].setValue(this.oUsuario?.apellido2);
    this.usuarioForm?.controls['email'].setValue(this.oUsuario?.email);
  }

  get() {
    this.oUsuarioService.getUser(this.id).subscribe({
      next: (oUsuario: IUsuario) => {
        console.log(oUsuario);
        this.oUsuario = oUsuario;
        this.updateForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.usuarioForm?.invalid) {
      alert('Formulario invalido');
      return;
    } else {
      this.oUsuarioService.updateUser(this.usuarioForm?.value).subscribe({
        next: (oUsuario: IUsuario) => {
          this.oUsuario = oUsuario;
          this.updateForm();
          alert('Usuario actualizado');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
