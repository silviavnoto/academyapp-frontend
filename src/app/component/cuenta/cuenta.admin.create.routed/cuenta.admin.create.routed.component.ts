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
import { ICuenta } from '../../../model/cuenta.interface';
import { CuentaService } from '../../../service/cuenta.service';
import { MatDialog } from '@angular/material/dialog';
import { TipocuentaAdminSelectorUnroutedComponent } from '../../tipocuenta/tipocuenta.admin.selector.unrouted/tipocuenta.admin.selector.unrouted.component';
import { ITipocuenta } from '../../../model/tipocuenta.interface';
import { TipoCuentaService } from '../../../service/tipoCuenta.service';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-cuenta.admin.create.routed',
  templateUrl: './cuenta.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./cuenta.admin.create.routed.component.css'],
})
export class CuentaAdminCreateRoutedComponent implements OnInit {
  id: number = 0;
  oCuentaForm: FormGroup | undefined = undefined;
  oCuenta: ICuenta | null = null;
  strMessage: string = '';

  myModal: any;

  readonly dialog = inject(MatDialog);
  oTipocuenta: ITipocuenta = {} as ITipocuenta;

  constructor(
    private oCuentaService: CuentaService,
    private oRouter: Router,
    private oTipocuentaService: TipoCuentaService
  ) { }

  ngOnInit() {
    this.createForm();
    this.oCuentaForm?.markAllAsTouched();

    this.oCuentaForm?.controls['id_tipocuenta'].valueChanges.subscribe(change => {
      if (change) {
        // obtener el objeto tipocuenta del servidor
        this.oTipocuentaService.get(change).subscribe({
          next: (oTipocuenta: ITipocuenta) => {
            this.oTipocuenta = oTipocuenta;
          },
          error: (err) => {
            console.log(err);
            this.oTipocuenta = {} as ITipocuenta;
            // marcar el campo como inválido
            this.oCuentaForm?.controls['id_tipocuenta'].setErrors({
              invalid: true,
            });
          }
        });
      } else {
        this.oTipocuenta = {} as ITipocuenta;
      }
    });

  }

  createForm() {
    this.oCuentaForm = new FormGroup({
      codigo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      descripcion: new FormControl('', [
        Validators.maxLength(50),
      ]),
      id_tipocuenta: new FormControl(''),
    });
  }

  updateForm() {
    this.oCuentaForm?.controls['codigo'].setValue('');
    this.oCuentaForm?.controls['descripcion'].setValue('');
    this.oCuentaForm?.controls['id_tipocuenta'].setValue('');
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
    this.oRouter.navigate(['/admin/cuenta/view/' + this.oCuenta?.id]);
  };

  onSubmit() {
    if (this.oCuentaForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oCuentaService.create(this.oCuentaForm?.value).subscribe({
        next: (oCuenta: ICuenta) => {
          this.oCuenta = oCuenta;
          this.showModal('Cuenta creada con el id: ' + this.oCuenta.id);
        },
        error: (err) => {
          this.showModal('Error al crear cuenta');
          console.log(err);
        },
      });
    }
  }

  showTipocuentaSelectorModal() {
    const dialogRef = this.dialog.open(TipocuentaAdminSelectorUnroutedComponent, {
      height: '800px',
      maxHeight: '1200px',
      width: '80%',
      maxWidth: '90%',

    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oCuentaForm?.controls['id_tipocuenta'].setValue(result.id);
        this.oTipocuenta = result;
        //this.animal.set(result);
      }
    });




    return false;
  }


}
