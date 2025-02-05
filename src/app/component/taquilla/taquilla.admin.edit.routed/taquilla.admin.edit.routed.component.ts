import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaquillaService } from '../../../service/taquilla.service';
import { ITaquilla } from '../../../model/taquilla.interface';
import { MatRadioModule } from '@angular/material/radio';
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
  selector: 'app-taquilla-admin-edit-routed',
  templateUrl: './taquilla.admin.edit.routed.component.html',
  styleUrls: ['./taquilla.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatRadioModule
  ],
})
export class TaquillaAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oTaquillaForm: FormGroup | undefined = undefined;
  oTaquilla: ITaquilla | null = null;
  message: string = '';

  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oTaquillaService: TaquillaService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oTaquillaForm?.markAllAsTouched();
  }

  
  onInputToUpperCase(controlName: string, event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.oTaquillaForm?.get(controlName)?.setValue(inputValue.toUpperCase());
  }  

  createForm() {
    this.oTaquillaForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      numero: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d{3}$'), 
      ]),
      bloque: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{1,2}$') // Solo letras mayúsculas de 1 a 2 caracteres
      ]),
      disponible: new FormControl(false, [
        Validators.required
      ]),
    });
  }


  onReset() {
    this.oTaquillaService.get(this.id).subscribe({
      next: (oTaquilla: ITaquilla) => {
        this.oTaquilla = oTaquilla;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    console.log('Disponible (antes de asignar):', this.oTaquilla?.disponible);

    const disponibleValue = this.oTaquilla?.disponible === true; 

    this.oTaquillaForm?.controls['id'].setValue(this.oTaquilla?.id);
    this.oTaquillaForm?.controls['numero'].setValue(this.oTaquilla?.numero);
    this.oTaquillaForm?.controls['bloque'].setValue(this.oTaquilla?.bloque);
    this.oTaquillaForm?.controls['disponible'].setValue(this.oTaquilla?.disponible);

    console.log('Disponible (en formulario):', this.oTaquillaForm?.controls['disponible'].value);
   

    console.log(this.oTaquilla);

     // Forzar la actualización de los valores
  this.oTaquillaForm?.updateValueAndValidity();
  }

  get() {
    this.oTaquillaService.get(this.id).subscribe({
      next: (oTaquilla: ITaquilla) => {
        console.log(oTaquilla.disponible);
        this.oTaquilla = oTaquilla;
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
    this.oRouter.navigate(['/admin/taquilla/view/' + this.oTaquilla?.id]);
  };

  onSubmit() {
    if (!this.oTaquillaForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oTaquillaService.update(this.oTaquillaForm?.value).subscribe({
        next: (oTaquilla: ITaquilla) => {
          this.oTaquilla = oTaquilla;
          this.updateForm();
          this.showModal('Taquilla ' + this.oTaquilla.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el Taquilla');
          console.error(error);
        },
      });
    }
  }
}
