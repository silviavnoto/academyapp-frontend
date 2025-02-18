import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IClase } from '../../../model/clase.interface';
import { ClaseService } from '../../../service/clase.service';

@Component({
  selector: 'app-alumno.view::not(p)',
  templateUrl: './alumno.clase.view.component.html',
  styleUrls: ['./alumno.clase.view.component.css']
})
export class AlumnoClaseViewComponent implements OnInit {

  id: number = 0;
  oClase: IClase = {} as IClase;
  fotoDni: string | undefined;
  modalImage: string = '';

  constructor(private oActivatedRoute: ActivatedRoute, private oClaseService: ClaseService) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }

  
  
    
  
  getOne() {
    this.oClaseService.getOne(this.id).subscribe({
      next: (data: IClase) => {
        this.oClase = data;
      },
      error: (err) => {
        console.error('Error al obtener los datos de la Clase', err);
      }
    });
  }

 
  
}