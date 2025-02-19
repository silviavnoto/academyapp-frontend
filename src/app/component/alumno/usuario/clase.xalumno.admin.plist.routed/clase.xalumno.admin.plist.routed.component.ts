import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { HttpErrorResponse } from '@angular/common/http';
import { ISumas } from '../../../model/sumas.interface';
import { IClase } from '../../../model/clase.interface';

import { ClaseService } from '../../../service/clase.service';
import { UsuarioService } from '../../../service/usuario.service';
import { IUsuario } from '../../../model/usuario.interface';


@Component({
  selector: 'app-clase.xusuario.admin.routed',
  templateUrl: './clase.xusuario.admin.plist.routed.component.html',
  styleUrls: ['./clase.xusuario.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class ClaseXAlumnoAdminPlistRoutedComponent implements OnInit {
  oPage: IPage<IClase> | null = null;
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

  oUsuario: IUsuario = {} as IUsuario;
  oTotal: ISumas = {} as ISumas;
  nDiferencia: number = 0;

  constructor(
    private oClaseService: ClaseService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService
  ) {
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.getPage();
    });

    this.oActivatedRoute.params.subscribe((params) => {
      this.oUsuario.id = params['id'];
      //
      this.getPage(); // carga en paralelo de 1 la página
      //
      this.oUsuarioService.get(params['id']).subscribe({ // carga en paralelo de 2 el titulo
        next: (oUsuario: IUsuario) => {          
          this.oUsuario = oUsuario;         
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
      //
      this.oActivatedRoute.params.subscribe((params) => { // carga en paralelo de 3 la suma
        this.oClaseService.getTotalClasesXUsuario(params['id']).subscribe({
          next: (oSuma: ISumas) => {
            this.oTotal = oSuma;
            this.nDiferencia = this.oTotal.totalDebe - this.oTotal.totalHaber;
            console.log(this.oTotal);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });
      })
      //
    });
  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oClaseService
      .getPageXUsuario(
        this.nPage,
        this.nRpp,
        this.strField,
        this.strDir,
        this.strFiltro,
        this.oUsuario.id
      )
      .subscribe({
        next: (oPageFromServer: IPage<IClase>) => {
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

  edit(oClase: IClase) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/clase/edit', oClase.id]);
  }

  view(oClase: IClase) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/clase/view', oClase.id]);
  }

  remove(oClase: IClase) {
    this.oRouter.navigate(['admin/clase/delete/', oClase.id]);
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
}
