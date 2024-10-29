import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IUsuario } from '../../../../../../model/usuario.interface';
import { UsuarioService } from '../../../../../../service/usuario.service';

@Component({
  selector: 'app-usuario.admin.create.routed',
  templateUrl: './usuario.admin.create.routed.component.html',
  styleUrls: ['./usuario.admin.create.routed.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class UsuarioAdminCreateRoutedComponent implements OnInit {
  oUsuario: IUsuario | undefined = undefined;
  usuarioForm: FormGroup | undefined = undefined;
  isCreated: boolean = false;
  constructor(private oUsuarioService: UsuarioService) {}

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario() {
    this.usuarioForm = new FormGroup({
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
  updateForm() {
    this.usuarioForm?.controls['nombre'].setValue(this.oUsuario?.nombre);
    this.usuarioForm?.controls['apellido1'].setValue(this.oUsuario?.apellido1);
    this.usuarioForm?.controls['apellido2'].setValue(this.oUsuario?.apellido2);
    this.usuarioForm?.controls['email'].setValue(this.oUsuario?.email);
  }

  vaciarFormulario() {
    this.usuarioForm?.controls['nombre'].setValue('');
    this.usuarioForm?.controls['apellido1'].setValue('');
    this.usuarioForm?.controls['apellido2'].setValue('');
    this.usuarioForm?.controls['email'].setValue('');
  } 

  onSubmit() {
    if (this.usuarioForm?.invalid) {
      alert('Formulario invalido');
      return;
    } else {
      console.log(this.usuarioForm?.value);
      this.oUsuarioService.createUser(this.usuarioForm?.value).subscribe({
        next: (oUsuario: IUsuario) => {
          this.oUsuario = oUsuario;
          this.updateForm();
          this.isCreated = true;
          this.vaciarFormulario();
          this.crearFormulario();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
