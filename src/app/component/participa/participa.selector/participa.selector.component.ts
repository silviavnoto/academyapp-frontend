import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IParticipa } from '../../../model/participa.interface';
import { IPage } from '../../../environment/model.interface';
import { BotoneraService } from '../../../service/botonera.service';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { ParticipaService } from '../../../service/participa.service';


@Component({
  selector: 'app-usuario-admin-selector-unrouted',
  templateUrl: './participa.selector.component.html',
  styleUrls: ['./participa.selector.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class ParticipaSelectorComponent implements OnInit {
  oPage: IPage<IParticipa> | null = null;
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

  readonly dialogRef = inject(MatDialogRef<ParticipaSelectorComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

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
    this.getPage();
  }

   getPage() {
          if (this.data.origen == "xbalance"){
            this.oParticipaService.getPageXBalanceNoTiene(
              this.nPage,
              this.nRpp,
              this.data.idBalance
            ).subscribe({
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
            })
          } else {
          this.oParticipaService
            .getPage(
              this.nPage,
              this.nRpp,
              this.strField,
              this.strDir,
              this.strFiltro
            )
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
        }
      
       
      
        select(oParticipa: IParticipa) {
          
            // estamos en ventana emergente: no navegar
            // emitir el objeto seleccionado
      
            this.dialogRef.close(oParticipa);
      
      
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
  