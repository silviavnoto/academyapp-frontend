import { Component, inject, OnInit } from '@angular/core';

import { IPage } from '../../../environment/model.interface';

import { BotoneraService } from '../../../service/botonera.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUsuario } from '../../../model/usuario.interface';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-usuarioselector',
  templateUrl: './usuarioselector.component.html',
  styleUrls: ['./usuarioselector.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class UsuarioselectorComponent implements OnInit {
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
  //
  readonly dialogRef = inject(MatDialogRef<UsuarioselectorComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

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
        if (this.data.origen == "xbalance"){
          this.oUsuarioService.getPageXBalanceNoTiene(
            this.nPage,
            this.nRpp,
            this.data.idBalance
          ).subscribe({
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
          })
        } else {
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
      }
    
     
    
      select(oUsuario: IUsuario) {
        console.log("Usuario seleccionado en el modal:", oUsuario);
          // estamos en ventana emergente: no navegar
          // emitir el objeto seleccionado
    
          this.dialogRef.close(oUsuario);
    
    
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

  
    