import { Routes } from '@angular/router';


import { ClaseAdminPlistRoutedComponent } from './component/clase/clase.admin.plist.routed/clase.admin.plist.routed.component';
import { ClaseAdminEditRoutedComponent } from './component/clase/clase.admin.edit.routed/clase.admin.edit.routed.component';
import { ClaseAdminViewRoutedComponent } from './component/clase/clase.admin.view.routed/clase.admin.view.routed.component';
import { ClaseAdminCreateRoutedComponent } from './component/clase/clase.admin.create.routed/clase.admin.create.routed.component';
import { ClaseAdminDeleteRoutedComponent } from './component/clase/clase.admin.delete.routed/clase.admin.delete.component';

import { UsuarioPlistComponent } from './component/usuario/usuario.plist/usuario.plist.component';
import { UsuarioEditComponent } from './component/usuario/usuario.edit/usuario.edit.component';
import { UsuarioCreateComponent } from './component/usuario/usuario.create/usuario.create.component';
import { UsuarioViewComponent } from './component/usuario/usuario.view/usuario.view.component';
import { UsuarioDeleteComponent } from './component/usuario/usuario.delete/usuario.delete.component';

import { ContableGuard } from './guards/contable.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminOrContableGuard } from './guards/admin-or-contable.guard';

import { SharedLogoutRoutedComponent } from './shared/shared.logout.routed/shared.logout.routed';
import { SharedLoginRoutedComponent } from './shared/shared.login.routed/shared.login.routed';
import { SharedByemailRoutedComponent } from './shared/shared.byemail.routed/shared.byemail.routed.component';
import { SharedHomeRoutedComponent } from './shared/shared.home.routed/shared.home.routed.component';

import { ProfesorPlistComponent } from './component/usuario/profesor.usuario.plist/profesor.plist.component';
import { ProfesorClasePlistComponent } from './component/clase/profesor.clase.plist/profesor.clase.plist.component';
import { AuditorGuard } from './guards/auditor.guard';


import { AlumnoPlistComponent } from './component/usuario/alumno.usuario.plist/alumno.plist.component';
import { AlumnoClasePlistComponent } from './component/clase/alumno.clase.plist/alumno.clase.plist.component';
import { ProfesorViewComponent } from './component/usuario/profesor.usuario.view/profesor.view.component';
import { AlumnoClaseViewComponent } from './component/clase/alumno.clase.view/alumno.clase.view.component';
import { ProfesorClaseCreateComponent } from './component/clase/profesor.clase.create/profesor.clase.create.component';
import { ProfesorClaseViewComponent } from './component/clase/profesor.clase.view/profesor.clase.view.component';
import { ProfesorClaseEditComponent } from './component/clase/profesor.clase.edit/profesor.clase.edit.component';
import { ProfesorClaseDeleteComponent } from './component/clase/profesor.clase.delete/profesor.clase.delete.component';
//import { ProfesorClaseEditComponent } from './component/clase/profesor.clase.edit/profesor.clase.edit.component';

//import { ProfesorViewComponent } from './component/usuario/profesor.usuario.view/profesor.view.component';





export const routes: Routes = [
  { path: '', component: SharedHomeRoutedComponent },
  { path: 'home', component: SharedHomeRoutedComponent },

  { path: 'admin/clase/plist', component: ClaseAdminPlistRoutedComponent },
  { path: 'admin/clase/edit/:id', component: ClaseAdminEditRoutedComponent, },
  { path: 'admin/clase/view/:id', component: ClaseAdminViewRoutedComponent, },
  { path: 'admin/clase/create', component: ClaseAdminCreateRoutedComponent, pathMatch: 'full', },
  { path: 'admin/clase/delete/:id', component: ClaseAdminDeleteRoutedComponent, },

  


  { path: '', component: SharedHomeRoutedComponent },
  { path: 'home', component: SharedHomeRoutedComponent },
  { path: 'login', component: SharedLoginRoutedComponent },
  { path: 'logout', component: SharedLogoutRoutedComponent },
  { path: 'byemail/:email', component: SharedByemailRoutedComponent, canActivate: [ContableGuard] },


  { path: 'admin/usuario/plist', component: UsuarioPlistComponent, canActivate: [AdminGuard]},
  { path: 'admin/usuario/edit/:id', component: UsuarioEditComponent, canActivate: [AdminGuard] },
  { path: 'admin/usuario/view/:id', component: UsuarioViewComponent, canActivate: [AdminOrContableGuard] },
  { path: 'admin/usuario/create', component: UsuarioCreateComponent, canActivate: [AdminGuard] },
  { path: 'admin/usuario/delete/:id', component: UsuarioDeleteComponent, canActivate: [AdminGuard] },

  { path: 'profesor/usuario/plist', component: ProfesorPlistComponent, canActivate: [ContableGuard]},
  { path: 'alumno/usuario/plist', component: AlumnoPlistComponent, canActivate: [AuditorGuard]},

  { path: 'profesor/usuario/view/:id', component: ProfesorViewComponent, canActivate: [ContableGuard]},

  { path: 'alumno/clase/plist', component: AlumnoClasePlistComponent, canActivate: [AuditorGuard]},
  { path: 'alumno/clase/view/:id', component: AlumnoClaseViewComponent, canActivate: [AuditorGuard]},


  { path: 'profesor/clase/plist', component: ProfesorClasePlistComponent, canActivate: [ContableGuard]},
  { path: 'profesor/clase/edit/:id', component: ProfesorClaseEditComponent, canActivate: [ContableGuard]},
  { path: 'profesor/clase/view/:id', component: ProfesorClaseViewComponent, canActivate: [ContableGuard]},
  { path: 'profesor/clase/create', component: ProfesorClaseCreateComponent, canActivate: [ContableGuard]},
  { path: 'profesor/clase/delete/:id', component: ProfesorClaseDeleteComponent, canActivate: [ContableGuard]},


];
