import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shared-menu-unrouted',
  templateUrl: './shared.menu.unrouted.component.html',
  styleUrls: ['./shared.menu.unrouted.component.css'],
  standalone: true
})
export class SharedMenuUnroutedComponent implements OnInit {

  strRuta: string = '';
  constructor(private oRoute: ActivatedRoute) { 
    this.strRuta = oRoute.snapshot.routeConfig?.path || '';
  }

  ngOnInit() {
  }

}
