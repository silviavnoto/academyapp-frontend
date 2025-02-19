import { Component, OnInit } from '@angular/core';
import { ParticipaService } from '../../../../service/participa.service';
import { IParticipa } from '../../../../model/participa.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../../pipe/trim.pipe';


@Component({
  selector: 'app-participa.admin.routed',
  templateUrl: './participa.admin.plist.routed.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class ParticipaAdminPlistRoutedComponent implements OnInit {
  
  oPage: IPage<IParticipa> | null = null;
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
    private oParticipaService: ParticipaService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router
  ) {
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.getPage();
    });
  }

  ngOnInit() {
    console.log("ParticipaAdminPlistComponent: cargado")
    this.getPage();
  }

  getPage() {
    this.oParticipaService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
      .subscribe({
        next: (oPageFromServer: IPage<IParticipa>) => {
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

  edit(oParticipa: IParticipa) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/participa/edit', oParticipa.id]);
  }

  view(oParticipa: IParticipa) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/participa/view', oParticipa.id]);
  }

  remove(oParticipa: IParticipa) {
    this.oRouter.navigate(['admin/participa/delete/', oParticipa.id]);
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
