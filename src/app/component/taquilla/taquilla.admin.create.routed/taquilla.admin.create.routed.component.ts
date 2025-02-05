import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {
  FormControl,
  FormGroup,  
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITaquilla } from '../../../model/taquilla.interface';
import { TaquillaService } from '../../../service/taquilla.service';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-taquilla.admin.create.routed',
  templateUrl: './taquilla.admin.create.routed.component.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    MatRadioModule
  ],
  styleUrls: ['./taquilla.admin.create.routed.component.css'],
})
export class TaquillaAdminCreateRoutedComponent implements OnInit {

  id: number = 0;
  oTaquillaForm: FormGroup | undefined = undefined;
  oTaquilla: ITaquilla | null = null;
  strMessage: string = '';

  myModal: any;

  form: FormGroup = new FormGroup({});

  constructor(
    private oTaquillaService: TaquillaService,
    private oRouter: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.oTaquillaForm?.markAllAsTouched();
  }

  onInputToUpperCase(controlName: string, event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.oTaquillaForm?.get(controlName)?.setValue(inputValue.toUpperCase());
  }  

  createForm() {
    this.oTaquillaForm = new FormGroup({
      numero: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d{3}$'), 
      ]),
      bloque: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{1,2}$') // Solo letras mayúsculas de 1 a 2 caracteres
      ]),
      disponible: new FormControl(true, [
        Validators.required
      ]),
    });
  }

  updateForm() {
    this.oTaquillaForm?.controls['numero'].setValue('');
    this.oTaquillaForm?.controls['bloque'].setValue('');
    this.oTaquillaForm?.controls['disponible'].setValue('true');
    console.log(this.oTaquilla);
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
    this.oRouter.navigate(['/admin/taquilla/view/' + this.oTaquilla?.id]);
  }

  onSubmit() {
    if (this.oTaquillaForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {      
      this.oTaquillaService.create(this.oTaquillaForm?.value).subscribe({
        next: (oTaquilla: ITaquilla) => {
          this.oTaquilla = oTaquilla;
          this.showModal('Taquilla creado con el id: ' + this.oTaquilla.id);
        },
        error: (err) => {
          this.showModal('Error al crear la taquilla');
          console.log(err);
        },
      });
    }
  }



}
