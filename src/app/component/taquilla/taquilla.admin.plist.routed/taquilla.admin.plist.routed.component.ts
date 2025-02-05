import { Component, OnInit } from '@angular/core';
import { TaquillaService } from '../../../service/taquilla.service';
import { ITaquilla } from '../../../model/taquilla.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-taquilla.admin.routed',
  templateUrl: './taquilla.admin.plist.routed.component.html',
  styleUrls: ['./taquilla.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class TaquillaAdminPlistRoutedComponent implements OnInit {
  
  oPage: IPage<ITaquilla> | null = null;
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
    private oTaquillaService: TaquillaService,
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
    this.oTaquillaService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
      .subscribe({
        next: (oPageFromServer: IPage<ITaquilla>) => {
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

  edit(oTaquilla: ITaquilla) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/taquilla/edit', oTaquilla.id]);
  }

  view(oTaquilla: ITaquilla) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/taquilla/view', oTaquilla.id]);
  }

  remove(oTaquilla: ITaquilla) {
    this.oRouter.navigate(['admin/taquilla/delete/', oTaquilla.id]);
  }

  flip(oTaquilla: ITaquilla) {
    this.oTaquillaService.flip(oTaquilla).subscribe({
      next: (oTaquillaFromServer: ITaquilla) => {
        this.getPage();
      },
      error: (err: HttpErrorResponse) => {
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
    this.nPage = 0;
    this.nRpp = nrpp;
    this.getPage();
    return false;
  }

  filter(event: KeyboardEvent) {
    this.debounceSubject.next(this.strFiltro);
  }
}
