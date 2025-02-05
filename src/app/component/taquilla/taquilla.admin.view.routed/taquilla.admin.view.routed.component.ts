import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaquillaService } from '../../../service/taquilla.service';
import { ITaquilla } from '../../../model/taquilla.interface';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-taquilla.admin.view.routed',
  templateUrl: './taquilla.admin.view.routed.component.html',
  styleUrls: ['./taquilla.admin.view.routed.component.css']
})
export class TaquillaAdminViewRoutedComponent implements OnInit {
  //
  id: number = 0;
  route: string = '';
  oTaquilla: ITaquilla = {} as ITaquilla;
  //
  constructor(private oActivatedRoute: ActivatedRoute, private oTaquillaService: TaquillaService) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    
    this.getOne();
  }

  getOne() {
    this.oTaquillaService.getOne(this.id).subscribe({
      next: (data: ITaquilla) => {
        this.oTaquilla = data;
      },
    });
  }
}