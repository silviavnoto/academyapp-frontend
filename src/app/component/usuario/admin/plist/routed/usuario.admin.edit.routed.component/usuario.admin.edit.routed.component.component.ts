import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../../../service/usuario.service';
import { IUsuario } from '../../../../../../model/usuario.interface';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario.admin.edit.routed.component',
  templateUrl: './usuario.admin.edit.routed.component.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  styleUrls: ['./usuario.admin.edit.routed.component.component.css'],
})
export class UsuarioAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oUsuario: IUsuario | null = null;
  oUsuarioForm: FormGroup | null = null;
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
    this.oUsuarioForm = new FormGroup({
      nombre: new FormControl(this.oUsuario?.nombre,[Validators.required]),
      apellido1: new FormControl(this.oUsuario?.apellido1, [Validators.required]),
      apellido2: new FormControl(this.oUsuario?.apellido2),
      email: new FormControl(this.oUsuario?.email, [Validators.required]),
    })
  }

  get() {
    this.oUsuarioService.getUser(this.id).subscribe({
      next: (oUsuario: IUsuario) => {
        console.log(oUsuario);
        this.oUsuario = oUsuario;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
