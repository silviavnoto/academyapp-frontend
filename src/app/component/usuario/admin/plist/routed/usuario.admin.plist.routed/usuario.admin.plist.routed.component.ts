import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../../service/usuario.service';
import { IUsuario } from '../../../../../../model/usuario.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../../../../service/botonera.service';
import { debounceTime, filter, first, map, repeat, Subject } from 'rxjs';
import { TrimPipe } from '../../../../../../pipe/trim.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario.admin.routed',
  templateUrl: './usuario.admin.plist.routed.component.html',
  styleUrls: ['./usuario.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class UsuarioAdminPlistRoutedComponent implements OnInit {
  oPage: IPage<IUsuario> | null = null;
  nPage: number = 0; // 0-based server count
  nRpp: number = 10;
  arrBotonera: string[] = [];
  strField: string = '';
  strDir: string = 'desc';
  strFiltro: string = '';
  totalUsers: number = 0;

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
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
      .subscribe({
        next: (oPageFromServer: IPage<IUsuario>) => {
          this.oPage = oPageFromServer;
          
          
          this.arrBotonera = this.oBotoneraService.getBotonera(
            this.nPage,
            this.oPage?.totalPages
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
    this.oUsuarioService.countUsers().subscribe({
      next: (totalUsers: number) => {
        this.totalUsers = totalUsers;
      },
      error: (err) => {
        console.log(err);
      },
    });
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
    this.nRpp = nrpp;
    this.nPage = 0;
    this.getPage();
    return false;
  }

  buscar(event: KeyboardEvent) {
    console.log(KeyboardEvent);
    this.nPage = 0;
    this.debounceSubject.next(this.strFiltro);
  }
}
