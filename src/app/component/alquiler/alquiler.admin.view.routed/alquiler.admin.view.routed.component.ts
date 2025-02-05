import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlquilerService } from '../../../service/alquiler.service';
import { IAlquiler } from '../../../model/alquiler.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-alquiler.admin.view.routed',
  templateUrl: './alquiler.admin.view.routed.component.html',
  standalone: true,
  imports: [
    BrowserModule,
    RouterModule,
  ],
})
export class AlquilerAdminViewRoutedComponent implements OnInit {
  //
  id: number = 0;
  route: string = '';
  oAlquiler: IAlquiler = {} as IAlquiler;
  //
  constructor(private oActivatedRoute: ActivatedRoute, private oAlquilerService: AlquilerService) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    
    this.getOne();
  }

  getOne() {
    this.oAlquilerService.getOne(this.id).subscribe({
      next: (data: IAlquiler) => {
        this.oAlquiler = data;
      },
    });
  }
}