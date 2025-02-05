import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfesorService } from '../../../service/profesor.service';
import { IProfesor } from '../../../model/profesor.interface';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-profesor.admin.view.routed',
  templateUrl: './profesor.admin.view.routed.component.html',
  styleUrls: ['./profesor.admin.view.routed.component.css']
})
export class ProfesorAdminViewRoutedComponent implements OnInit {
  //
  id: number = 0;
  route: string = '';
  oProfesor: IProfesor = {} as IProfesor;
  //
  constructor(private oActivatedRoute: ActivatedRoute, private oProfesorService: ProfesorService) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    
    this.getOne();
  }

  getOne() {
    this.oProfesorService.getOne(this.id).subscribe({
      next: (data: IProfesor) => {
        this.oProfesor = data;
      },
    });
  }
}