import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SubcuentaService } from '../../../service/subcuenta.service';
import { ISubcuenta } from '../../../model/subcuenta.interface';
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
  selector: 'app-subcuenta.admin.edit.routed',
  templateUrl: './subcuenta.admin.edit.routed.component.html',
  styleUrls: ['./subcuenta.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SubcuentaAdminEditRoutedComponent implements OnInit {

  id: number = 0;
  oSubcuentaForm: FormGroup | undefined = undefined;
  oSubcuenta: ISubcuenta | null = null;
  message: string = '';
  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oSubcuentaService: SubcuentaService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oSubcuentaForm?.markAllAsTouched();
  }

  createForm() {
    this.oSubcuentaForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      codigo: new FormControl('', [
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      id_cuenta: new FormControl('', [

      ]),
      momentstamp: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$'
        ),
      ]),
    });
  }


  onReset() {
    this.oSubcuentaService.get(this.id).subscribe({
      next: (oSubcuenta: ISubcuenta) => {
        this.oSubcuenta = oSubcuenta;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oSubcuentaForm?.controls['id'].setValue(this.oSubcuenta?.id);
    this.oSubcuentaForm?.controls['codigo'].setValue(this.oSubcuenta?.codigo);
    this.oSubcuentaForm?.controls['descripcion'].setValue(this.oSubcuenta?.descripcion);
    this.oSubcuentaForm?.controls['id_cuenta'].setValue(this.oSubcuenta?.id_cuenta);
    this.oSubcuentaForm?.controls['momentstamp'].setValue(this.oSubcuenta?.momentstamp);
  }

  get() {
    this.oSubcuentaService.get(this.id).subscribe({
      next: (oSubcuenta: ISubcuenta
      ) => {
        this.oSubcuenta = oSubcuenta;
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
    this.oRouter.navigate(['/admin/Subcuenta/view/' + this.oSubcuenta?.id]);
  };

  onSubmit() {
    if (!this.oSubcuentaForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oSubcuentaService.update(this.oSubcuentaForm?.value).subscribe({
        next: (oSubcuenta: ISubcuenta) => {
          this.oSubcuenta = oSubcuenta;
          this.updateForm();
          this.showModal('Subcuenta ' + this.oSubcuenta.id + ' actualizada');
        },
        error: (error) => {
          this.showModal('Error al actualizar el Subcuenta');
          console.error(error);
        },
      });
    }
  }

}
