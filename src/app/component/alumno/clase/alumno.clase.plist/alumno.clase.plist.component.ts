import { Component, OnInit } from '@angular/core';


import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../../pipe/trim.pipe';
import { IClase } from '../../../../model/clase.interface';
import { IPage } from '../../../../environment/model.interface';
import { ClaseService } from '../../../../service/clase.service';
import { BotoneraService } from '../../../../service/botonera.service';


@Component({
  selector: 'app-clase.admin.routed:not(p)',
  templateUrl: './alumno.clase.plist.component.html',
  styleUrls: ['./alumno.clase.plist.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class AlumnoClasePlistComponent implements OnInit {
  
  oPage: IPage<IClase> | null = null;
  //
  nPage: number = 0; // 0-based server count
  nRpp: number = 10;
  //
  strField: string = '';
  strDir: string = '';
  //
  strFiltro: string = '';
  //
  arrBotonera: string[] = [];
  //
  private debounceSubject = new Subject<string>();
  constructor(
    private oClaseService: ClaseService,
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
    this.oClaseService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
      .subscribe({
        next: (oPageFromServer: IPage<IClase>) => {
          console.log("📌 Datos recibidos desde el backend:", oPageFromServer);
          this.oPage = oPageFromServer;
          this.arrBotonera = this.oBotoneraService.getBotonera(
            this.nPage,
            oPageFromServer.totalPages
          );
        },
        error: (err) => {
          console.log(err);
          console.error("❌ Error obteniendo clases:", err);
        },
      });
  }

  edit(oClase: IClase) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/clase/edit', oClase.id]);
  }

  view(oClase: IClase) {
    //navegar a la página de edición
    this.oRouter.navigate(['alumno/clase/view', oClase.id]);
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
