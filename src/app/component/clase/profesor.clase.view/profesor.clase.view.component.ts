import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IClase } from '../../../model/clase.interface';
import { ClaseService } from '../../../service/clase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profesor.clase.view',
  templateUrl: './profesor.clase.view.component.html',
  standalone: true,
  styleUrls: ['./profesor.clase.view.component.css'],
   imports: [CommonModule,
      RouterModule]
})
export class ProfesorClaseViewComponent implements OnInit {

   id: number = 0;
    oClase: IClase = {} as IClase;
    fotoDni: string | undefined;
    modalImage: string = '';

  constructor(private oActivatedRoute: ActivatedRoute, private oClaseService: ClaseService) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    console.log("ID del Clase:", this.id); 
    this.getOne();
  }

  getOne() {
    this.oClaseService.getOne(this.id).subscribe({
      next: (data: IClase) => {
        this.oClase = data;
      },
      error: (err) => {
        console.error('Error al obtener los datos del Clase', err);
      }
    });
  }
}
