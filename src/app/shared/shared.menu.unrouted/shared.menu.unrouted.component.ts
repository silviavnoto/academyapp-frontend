import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from '../../service/session.service';
import { UsuarioService } from '../../service/usuario.service';
import { IUsuario } from '../../model/usuario.interface';

@Component({
  selector: 'app-shared-menu-unrouted',
  templateUrl: './shared.menu.unrouted.component.html',
  styleUrls: ['./shared.menu.unrouted.component.css'],
  standalone: true,
})

export class SharedMenuUnroutedComponent implements OnInit {
  strRuta: string = '';
  activeSession: boolean = false;
  userEmail: string = '';

  tipoUsuario: number = 0;
  

  constructor(
    private oRouter: Router,
    private oSessionService: SessionService,
    private oUsuarioService: UsuarioService
  ) {
    this.oRouter.events.subscribe((oEvent) => {
      if (oEvent instanceof NavigationEnd) {
        this.strRuta = oEvent.url;
      }
    });
    this.activeSession = this.oSessionService.isSessionActive();
    if (this.activeSession) {
      this.userEmail = this.oSessionService.getSessionEmail();

    }
  }

  ngOnInit() {
    this.oSessionService.onLogin().subscribe({
      next: () => {        
        this.activeSession = true;
        this.userEmail = this.oSessionService.getSessionEmail();

      },
    });

    this.oSessionService.onLogout().subscribe({
      next: () => {
        this.activeSession = false;
        this.userEmail = '';
      },
    });

    this.oUsuarioService.getUsuarioByEmail(this.userEmail).subscribe({
      next: (oUsuario:IUsuario)=>{
        this.tipoUsuario = oUsuario.tipousuario.id;
      }
    })
  }
}
