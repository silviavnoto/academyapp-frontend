import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../../../service/usuario.service';
import { IUsuario } from '../../../../../../model/usuario.interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-usuario.admin.edit.routed',
  templateUrl: './usuario.admin.edit.routed.component.html',
  styleUrls: ['./usuario.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class UsuarioAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  usuarioForm: FormGroup | null = null;
  oUsuario: IUsuario | null = null;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.get();
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl(this.oUsuario?.nombre, [Validators.required]),
    });
  }

  get() {
    this.oUsuarioService.get(this.id).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oUsuario = oUsuario;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
