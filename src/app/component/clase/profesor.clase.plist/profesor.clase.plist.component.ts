import { Component, OnInit } from '@angular/core';
import { IClase } from '../../../model/clase.interface';
import { IPage } from '../../../model/model.interface';
import { debounceTime, Subject } from 'rxjs';
import { ClaseService } from '../../../service/clase.service';
import { BotoneraService } from '../../../service/botonera.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';


@Component({
  selector: 'app-profesor.clase.plist',
  templateUrl: './profesor.clase.plist.component.html',
  styleUrls: ['./profesor.clase.plist.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule]
})

export class ProfesorClasePlistComponent implements OnInit {

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
    this.oRouter.navigate(['profesor/clase/edit', oClase.id]);
  } 

  view(oClase: IClase) {
    //navegar a la página de edición
    this.oRouter.navigate(['profesor/clase/view', oClase.id]);
  }

  remove(oClase: IClase) {
    this.oRouter.navigate(['profesor/clase/delete/', oClase.id]);
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