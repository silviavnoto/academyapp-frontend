import { Component, inject, OnInit } from '@angular/core';
import { ITipoUsuario } from '../../../model/tipoUsuario.interface';
import { IPage } from '../../../environment/model.interface';
import { TipoUsuarioService } from '../../../service/tipousuario.service';
import { BotoneraService } from '../../../service/botonera.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tipousuarioselector',
  templateUrl: './tipousuarioselector.component.html',
  styleUrls: ['./tipousuarioselector.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class TipousuarioselectorComponent implements OnInit {
  oPage: IPage<ITipoUsuario> | null = null;
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
  //
  readonly dialogRef = inject(MatDialogRef<TipousuarioselectorComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  constructor(
    private oTipoUsuarioService: TipoUsuarioService,
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
        if (this.data.origen == "xbalance"){
          this.oTipoUsuarioService.getPageXBalanceNoTiene(
            this.nPage,
            this.nRpp,
            this.data.idBalance
          ).subscribe({
            next: (oPageFromServer: IPage<ITipoUsuario>) => {
              this.oPage = oPageFromServer;
              this.arrBotonera = this.oBotoneraService.getBotonera(
                this.nPage,
                oPageFromServer.totalPages
              );
            },
            error: (err) => {
              console.log(err);
            },
          })
        } else {
        this.oTipoUsuarioService
          .getPage(
            this.nPage,
            this.nRpp,
            this.strField,
            this.strDir,
            this.strFiltro
          )
          .subscribe({
            next: (oPageFromServer: IPage<ITipoUsuario>) => {
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
      }
    
     
    
      select(oTipoUsuario: ITipoUsuario) {
        
          // estamos en ventana emergente: no navegar
          // emitir el objeto seleccionado
    
          this.dialogRef.close(oTipoUsuario);
    
    
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

  
    