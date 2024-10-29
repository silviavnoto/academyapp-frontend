import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../../service/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from '../../../../../../model/usuario.interface';

@Component({
  selector: 'app-usuario.admin.view.routed.component',
  templateUrl: './usuario.admin.view.routed.component.component.html',
  standalone: true,
  styleUrls: ['./usuario.admin.view.routed.component.component.css'],
})
export class UsuarioAdminViewRoutedComponent implements OnInit {
  id: number = 0;
  txt: string = 'Id: ';
  isUserDelete: boolean = false;
  oUsuarioView: IUsuario = {} as IUsuario;

  constructor(
    private oUsuarioService: UsuarioService,
    private oRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.oRoute.paramMap.subscribe((params) => {
      let idToDelete = params.get('id');
      this.id = Number(idToDelete);
      this.txt += this.id;
    });

    this.oUsuarioService.getUser(this.id).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oUsuarioView = oUsuario;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
