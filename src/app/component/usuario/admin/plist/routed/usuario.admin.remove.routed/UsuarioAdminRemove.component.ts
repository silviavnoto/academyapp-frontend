import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../../service/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from '../../../../../../model/usuario.interface';

@Component({
  selector: 'app-UsuarioAdminRemove',
  templateUrl: './UsuarioAdminRemove.component.html',
  standalone: true,
  styleUrls: ['./UsuarioAdminRemove.component.css']
})
export class UsuarioAdminRemoveComponent implements OnInit {
  id: number  = 0;
  txt: string = 'Id: ';
  isUserDelete: boolean = false;
  oUsuarioDel: IUsuario = {} as IUsuario;

  constructor(private oUsuarioService: UsuarioService, private oRoute: ActivatedRoute) { }

  ngOnInit() {
    this.oRoute.paramMap.subscribe(params => {
      let idToDelete = params.get('id');
      this.id = Number(idToDelete);
      this.txt += this.id;
    });


    this.oUsuarioService.getUser(this.id).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oUsuarioDel = oUsuario
      },
      error: (err) => {
        console.log(err);
      }
    })


    
  }

  deleteUser() {
      this.oUsuarioService.deleteUser(this.id).subscribe({
        next: () => {
          this.txt = 'Usuario eliminado: ' + this.id;
          this.isUserDelete = true;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

}
