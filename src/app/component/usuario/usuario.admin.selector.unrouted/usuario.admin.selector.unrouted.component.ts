import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';

import { MatDialogRef } from '@angular/material/dialog';
import { IUsuario } from '../../../model/usuario.interface';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-usuario-admin-selector-unrouted',
  templateUrl: './usuario.admin.selector.unrouted.component.html',
  styleUrls: ['./usuario.admin.selector.unrouted.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class UsuarioAdminSelectorUnroutedComponent implements OnInit {
  oPage: IPage<IUsuario> | null = null;
  //
  nPage: number = 0; // 0-based server count
  nRpp: number = 10;
  //
  strField: string = '';
  strDir: string = 'desc';
  //
  strFiltro: string = '';
  //
  arrBotonera: string[] = [];
  //
  private debounceSubject = new Subject<string>();

  readonly dialogRef = inject(MatDialogRef<UsuarioAdminSelectorUnroutedComponent>);

  constructor( 
    private oUsuarioService: UsuarioService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router
  ) { 
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.getPage();
    });
  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oUsuarioService
      .getPage(
        this.nPage,
        this.nRpp,
        this.strField,
        this.strDir,
        this.strFiltro
      )
      .subscribe({
        next: (oPageFromServer: IPage<IUsuario>) => {
          this.oPage = oPageFromServer;
          this.arrBotonera = this.oBotoneraService.getBotonera(
            this.nPage,
            oPageFromServer.totalPages
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  edit(oUsuario: IUsuario) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/usuario/edit', oUsuario.id]);
  }

  view(oUsuario: IUsuario) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/usuario/view', oUsuario.id]);
  }

  remove(oUsuario: IUsuario) {
    this.oRouter.navigate(['admin/usuario/delete/', oUsuario.id]);
  }

  goToPage(p: number) {
    if (p) {
      this.nPage = p - 1;
      this.getPage();
    }
    return false;
  }

  goToNext() {
    this.nPage++;
    this.getPage();
    return false;
  }

  goToPrev() {
    this.nPage--;
    this.getPage();
    return false;
  }

  sort(field: string) {
    this.strField = field;
    this.strDir = this.strDir === 'asc' ? 'desc' : 'asc';
    this.getPage();
  }

  goToRpp(nrpp: number) {
    this.nPage = 0;
    this.nRpp = nrpp;
    this.getPage();
    return false;
  }

  filter(event: KeyboardEvent) {
    this.debounceSubject.next(this.strFiltro);
  }

  select(oUsuario: IUsuario) {
    
    // estamos en ventana emergente: no navegar
    // emitir el objeto seleccionado

    this.dialogRef.close(oUsuario);


}
}
