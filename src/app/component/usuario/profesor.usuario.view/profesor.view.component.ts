import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from '../../../model/usuario.interface';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-usuario.view',
  templateUrl: './profesor.view.component.html',
  styleUrls: ['./profesor.view.component.css']
})
export class ProfesorViewComponent implements OnInit {

  id: number = 0;
  oUsuario: IUsuario = {} as IUsuario;
  fotoDni: string | undefined;
  modalImage: string = '';

  constructor(private oActivatedRoute: ActivatedRoute, private oUsuarioService: UsuarioService) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    console.log("ID del usuario:", this.id); 
    this.getOne();
  }

  
  
    
  
  getOne() {
    this.oUsuarioService.getOne(this.id).subscribe({
      next: (data: IUsuario) => {
        this.oUsuario = data;
      },
      error: (err) => {
        console.error('Error al obtener los datos del Usuario', err);
      }
    });
  }

 
  
}