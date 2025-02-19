import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClaseService } from '../../../../service/clase.service';
import { IClase } from '../../../../model/clase.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-clase.admin.view.routed',
  templateUrl: './clase.admin.view.routed.component.html',
  standalone: true,
  imports: [CommonModule,
    RouterModule]
  ,
})
export class ClaseAdminViewRoutedComponent implements OnInit {
  //
  id: number = 0;
  route: string = '';
  oClase: IClase = {} as IClase;
  //
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
    });
  }
}