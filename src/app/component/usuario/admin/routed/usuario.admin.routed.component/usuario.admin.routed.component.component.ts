import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../service/usuario.service';
import { IUsuario } from '../../../../../model/usuario.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../../../model/model.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario.admin.routed',
  templateUrl: './usuario.admin.routed.component.component.html',
  styleUrls: ['./usuario.admin.routed.component.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class UsuarioAdminRoutedComponent implements OnInit {
  lUsuarios: IUsuario[] = [];
  page: number = 0;

  arrBotonera: string[] = [];

  constructor(private oUsuarioService: UsuarioService) {}

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oUsuarioService.getPage(this.page, 10).subscribe({
      next: (arrUsuario: IPage<IUsuario>) => {
        this.lUsuarios = arrUsuario.content;
        console.log(arrUsuario);

        this.arrBotonera = [];
        for (let i = 1; i <= arrUsuario.totalPages; i++) {
          if (i == 1) {
            this.arrBotonera.push('1');
          } else if (i >= this.page - 2 && i <= this.page - -2) {
            this.arrBotonera.push(i.toString());
          } else if (i == arrUsuario.totalPages) {
            this.arrBotonera.push(arrUsuario.totalPages.toString());
          } else if (i == this.page - 3 || i == this.page - -3) {
            this.arrBotonera.push('...');
          }
        }

        console.log(this.arrBotonera);
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

  goToPage(p:number){
    this.page = p;
    this.getPage();
    return false;
  }

  goToNext(){
    this.page++;
    this.getPage();
    return false;
  }
  
  goToPrev(){
    this.page--;
    this.getPage();
    return false;
  }
}
