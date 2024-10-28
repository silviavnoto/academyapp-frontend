import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUsuario } from '../../../model/usuario.interface';
import { UsuarioService } from '../../../service/usuario.service';


declare let bootstrap: any;


@Component({
  standalone: true,
  selector: 'app-usuario.admin.create.routed',
  templateUrl: './usuario.admin.create.routed.component.html',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, RouterModule],
  styleUrls: ['./usuario.admin.create.routed.component.css']
})
export class UsuarioAdminCreateRoutedComponent implements OnInit {

  id: number = 0
  usuarioForm: FormGroup | undefined = undefined;
  oUsuario: IUsuario | null = null;

  usuarioCreado: boolean = false; // Para controlar la visibilidad del mensaje

  message: string = "";


  constructor(private oUsuarioService: UsuarioService) { 

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      apellido1: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      apellido2: new FormControl(''),
      email: new FormControl('',[Validators.required, Validators.email]),
    })
  }

  updateForm() {
    this.usuarioForm?.controls['nombre'].setValue('');
    this.usuarioForm?.controls['apellido1'].setValue('');
    this.usuarioForm?.controls['apellido2'].setValue('');
    this.usuarioForm?.controls['email'].setValue('');
  }


  showModal(mensaje: string) {
    this.message = mensaje;
    let myModal = new bootstrap.Modal(document.getElementById('mimodal'), { 
      keyboard: false
    })      
    myModal.show()
  }


  onReset() {
   this.updateForm();
   return false;
  }

  onSubmit() {

    if (this.usuarioForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    }else{

      this.usuarioCreado = true; // Mostrar el mensaje cuando el formulario se envíe correctamente
      this.oUsuarioService.create(this.usuarioForm?.value).subscribe({
        next: (oUsuario: IUsuario) => {
          this.oUsuario = oUsuario;
          console.log(oUsuario);
          this.showModal('Usuario creado con el id: '+ this.oUsuario.id);
        },
        error: (err) => {
          console.log(err);
        }
      })

    }
    
  }

}
