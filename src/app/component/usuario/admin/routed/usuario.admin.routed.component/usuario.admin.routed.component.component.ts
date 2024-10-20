import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../service/usuario.service';
import { IUsuario } from '../../../../../model/usuario.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../../../service/botonera.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-usuario.admin.routed',
  templateUrl: './usuario.admin.routed.component.component.html',
  styleUrls: ['./usuario.admin.routed.component.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class UsuarioAdminRoutedComponent implements OnInit {
  arrUsuarios: IUsuario[] = [];
  firstLoad: boolean = true;
  page: number = 0; // 0-based server count
  size: number = 10;
  field: string = 'id';
  dir: string = 'asc';
  filter: string = '';
  filterSubject: Subject<string> = new Subject();
  totalPages: number = 0;
  arrBotonera: string[] = [];

  constructor(
    private oUsuarioService: UsuarioService,
    private oBotoneraService: BotoneraService
  ) {}

  ngOnInit() {
    if (this.firstLoad === true) {
      this.getPage();
      this.firstLoad = false;
    } 
      this.filterSubject
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(() => {
          this.getPage();
        });
    
  }

  getPage() {
    this.oUsuarioService
      .getPage(this.page, this.size, this.field, this.dir, this.filter)
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe({
        next: (arrUsuario: IPage<IUsuario>) => {
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

  onFilterChange(value: string) {
    this.filter = value;
    this.filterSubject.next(this.filter);
  }

  getPageSort(sort: string) {
    this.oUsuarioService.getPageSort(this.page, this.size, sort).subscribe({
      next: (arrUsuario: IPage<IUsuario>) => {
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
    return false;
  }
  setSize(newSize: number) {
    this.size = newSize;
    this.getPage();
    return false;
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
}
