import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../../service/usuario.service';
import { IUsuario } from '../../../../../../model/usuario.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../../../../service/botonera.service';
import { debounceTime, filter, first, map, repeat, Subject } from 'rxjs';

@Component({
  selector: 'app-usuario.admin.routed',
  templateUrl: './usuario.admin.plist.routed.component.html',
  styleUrls: ['./usuario.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    private oBotoneraService: BotoneraService
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
    this.rpp = nrpp;
    this.getPage();
    const button = document.querySelector('#btn-1') as HTMLButtonElement;
    if (button) {
      button.click();
    }
    return false;
  }

  buscar(event: KeyboardEvent) {
    console.log(KeyboardEvent);
    this.debounceSubject.next(this.strFiltro);
  }
}
