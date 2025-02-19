import { Routes } from '@angular/router';


import { ContableGuard } from './guards/contable.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminOrContableGuard } from './guards/admin-or-contable.guard';
import { AuditorGuard } from './guards/auditor.guard';

import { SharedLogoutRoutedComponent } from './shared/shared.logout.routed/shared.logout.routed';
import { SharedLoginRoutedComponent } from './shared/shared.login.routed/shared.login.routed';
import { SharedByemailRoutedComponent } from './shared/shared.byemail.routed/shared.byemail.routed.component';
import { SharedHomeRoutedComponent } from './shared/shared.home.routed/shared.home.routed.component';
//ADMIN
//CLASE
import { ClaseAdminPlistRoutedComponent } from './component/admin/clase/clase.admin.plist.routed/clase.admin.plist.routed.component';
import { ClaseAdminEditRoutedComponent } from './component/admin/clase/clase.admin.edit.routed/clase.admin.edit.routed.component';
import { ClaseAdminViewRoutedComponent } from './component/admin/clase/clase.admin.view.routed/clase.admin.view.routed.component';
import { ClaseAdminCreateRoutedComponent } from './component/admin/clase/clase.admin.create.routed/clase.admin.create.routed.component';
import { ClaseAdminDeleteRoutedComponent } from './component/admin/clase/clase.admin.delete.routed/clase.admin.delete.component';
//ADMIN
//USUARIO
import { UsuarioPlistComponent } from './component/admin/usuario/usuario.plist/usuario.plist.component';
import { UsuarioEditComponent } from './component/admin/usuario/usuario.edit/usuario.edit.component';
import { UsuarioCreateComponent } from './component/admin/usuario/usuario.create/usuario.create.component';
import { UsuarioViewComponent } from './component/admin/usuario/usuario.view/usuario.view.component';
import { UsuarioDeleteComponent } from './component/admin/usuario/usuario.delete/usuario.delete.component';

//PROFESOR
//CLASE
import { ProfesorClaseCreateComponent } from './component/profesor/clase/profesor.clase.create/profesor.clase.create.component';
import { ProfesorClaseViewComponent } from './component/profesor/clase/profesor.clase.view/profesor.clase.view.component';
import { ProfesorClaseEditComponent } from './component/profesor/clase/profesor.clase.edit/profesor.clase.edit.component';
import { ProfesorClaseDeleteComponent } from './component/profesor/clase/profesor.clase.delete/profesor.clase.delete.component';
import { ProfesorClasePlistComponent } from './component/profesor/clase/profesor.clase.plist/profesor.clase.plist.component';

//ALUMNO
//CLASE
import { AlumnoClasePlistComponent } from './component/alumno/clase/alumno.clase.plist/alumno.clase.plist.component';
import { AlumnoClaseViewComponent } from './component/alumno/clase/alumno.clase.view/alumno.clase.view.component';




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


  { path: 'alumno/clase/plist', component: AlumnoClasePlistComponent, canActivate: [AuditorGuard]},
  { path: 'alumno/clase/view/:id', component: AlumnoClaseViewComponent, canActivate: [AuditorGuard]},


  { path: 'profesor/clase/plist', component: ProfesorClasePlistComponent, canActivate: [ContableGuard]},
  { path: 'profesor/clase/edit/:id', component: ProfesorClaseEditComponent, canActivate: [ContableGuard]},
  { path: 'profesor/clase/view/:id', component: ProfesorClaseViewComponent, canActivate: [ContableGuard]},
  { path: 'profesor/clase/create', component: ProfesorClaseCreateComponent, canActivate: [ContableGuard]},
  { path: 'profesor/clase/delete/:id', component: ProfesorClaseDeleteComponent, canActivate: [ContableGuard]},


];
