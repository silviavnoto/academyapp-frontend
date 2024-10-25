import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { IUsuario } from '../../../model/usuario.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, filter, first, map, repeat, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TrimPipe } from "../../../pipe/trim.pipe";


@Component({
  selector: 'app-usuario.admin.routed',
  templateUrl: './usuario.admin.plist.routed.component.html',
  styleUrls: ['./usuario.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe],
})
export class UsuarioAdminPlistRoutedComponent implements OnInit {
  arrUsuarios: IUsuario[] = [];
  page: number = 0; // 0-based server count
  totalPages: number = 0;
  rpp: number = 10;
  arrBotonera: string[] = [];
  field: string = '';
  dir: string = 'desc';
  strFiltro: string = '';

  private debounceSubject = new Subject<string>();

  constructor(
    private oUsuarioService: UsuarioService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router
  ) {
    this.debounceSubject.pipe(debounceTime(1000)).subscribe((value) => {
      this.getPage();
    });
  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oUsuarioService
      .getPage(this.page, this.rpp, this.field, this.dir, this.strFiltro)
      .pipe(
        map((oPage: IPage<IUsuario>) => {
          oPage.content.forEach((oUsuario) => {
            oUsuario.nombre = oUsuario.nombre.toUpperCase();
            oUsuario.apellido1 = oUsuario.apellido1.toUpperCase();
            oUsuario.apellido2 = oUsuario.apellido2.toUpperCase();
          });
          return oPage;
        })
      )
      .subscribe({
        next: (arrUsuario: IPage<IUsuario>) => {
          console.log("llegan datos");
          this.arrUsuarios = arrUsuario.content;
          this.arrBotonera = this.oBotoneraService.getBotonera(
            this.page,
            arrUsuario.totalPages
          );
          this.totalPages = arrUsuario.totalPages;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  editar(oUsuario: IUsuario) {
    console.log('Editar', oUsuario);
    //navegar a la página de edición
    this.oRouter.navigate(['admin/usuario/edit', oUsuario.id]);
  }

  eliminar(oUsuario: IUsuario) {
    console.log('Borrar', oUsuario);
  }

  goToPage(p: number) {
    if (p) {
      this.page = p - 1;
      this.getPage();
    }
    return false;
  }

  goToNext() {
    this.page++;
    this.getPage();
    return false;
  }

  goToPrev() {
    this.page--;
    this.getPage();
    return false;
  }

  sort(field: string) {
    this.field = field;
    this.dir = this.dir === 'asc' ? 'desc' : 'asc';
    this.getPage();
  }

  goToRpp(nrpp: number) {
    this.page = 0;
    this.rpp = nrpp;
    this.getPage();
    return false;
  }

  buscar(event: KeyboardEvent) {
    console.log(KeyboardEvent);
    this.debounceSubject.next(this.strFiltro);
  }
}
