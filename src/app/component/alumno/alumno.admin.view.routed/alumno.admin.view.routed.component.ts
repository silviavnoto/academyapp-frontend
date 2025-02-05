import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../service/alumno.service';
import { IAlumno } from '../../../model/alumno.interface';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-alumno.admin.view.routed',
  templateUrl: './alumno.admin.view.routed.component.html',
  styleUrls: ['./alumno.admin.view.routed.component.css']
})
export class AlumnoAdminViewRoutedComponent implements OnInit {
  //
  id: number = 0;
  route: string = '';
  oAlumno: IAlumno = {} as IAlumno;
  //
  constructor(private oActivatedRoute: ActivatedRoute, private oAlumnoService: AlumnoService) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    
    this.getOne();
  }

  getOne() {
    this.oAlumnoService.getOne(this.id).subscribe({
      next: (data: IAlumno) => {
        this.oAlumno = data;
      },
    });
  }
}