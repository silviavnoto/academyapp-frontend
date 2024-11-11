import { Routes } from '@angular/router';
import { UsuarioAdminPlistRoutedComponent } from './component/usuario/usuario.admin.plist.routed/usuario.admin.plist.routed.component';
import { UsuarioAdminEditRoutedComponent } from './component/usuario/usuario.admin.edit.routed/usuario.admin.edit.routed.component';
import { SharedHomeRoutedComponent } from './component/shared/shared.home.routed/shared.home.routed.component';
import { UsuarioAdminViewRoutedComponent } from './component/usuario/usuario.admin.view.routed/usuario.admin.view.routed.component';
import { UsuarioAdminCreateRoutedComponent } from './component/usuario/usuario.admin.create.routed/usuario.admin.create.routed.component';
import { UsuarioAdminDeleteRoutedComponent } from './component/usuario/usuario.admin.delete.routed/usuario.admin.delete.component';
import { ApunteAdminDeleteRoutedComponent } from './component/apunte/apunte.admin.delete.routed/apunte.admin.delete.component';
import { ApunteAdminPlistRoutedComponent } from './component/apunte/apunte.admin.plist.routed/apunte.admin.plist.routed.component';
import { ApunteAdminEditRoutedComponent } from './component/apunte/apunte.admin.edit.routed/apunte.admin.edit.routed.component';
import { ApunteAdminViewRoutedComponent } from './component/apunte/apunte.admin.view.routed/apunte.admin.view.routed.component';
import { ApunteAdminCreateRoutedComponent } from './component/apunte/apunte.admin.create.routed/apunte.admin.create.routed.component';

import { AsientoAdminDeleteRoutedComponent } from './component/asiento/asiento.admin.delete.routed/asiento.admin.delete.component';
import { AsientoAdminCreateRoutedComponent } from './component/asiento/asiento.admin.create.routed/asiento.admin.create.routed.component';
import { AsientoAdminViewRoutedComponent } from './component/asiento/asiento.admin.view.routed/asiento.admin.view.routed.component';
import { AsientoAdminEditRoutedComponent } from './component/asiento/asiento.admin.edit.routed/asiento.admin.edit.routed.component';
import { AsientoAdminPlistRoutedComponent } from './component/asiento/asiento.admin.plist.routed/asiento.admin.plist.routed.component';



export const routes: Routes = [
  { path: '', component: SharedHomeRoutedComponent },
  { path: 'home', component: SharedHomeRoutedComponent },

  { path: 'admin/usuario/plist', component: UsuarioAdminPlistRoutedComponent },
  { path: 'admin/usuario/edit/:id', component: UsuarioAdminEditRoutedComponent },
  { path: 'admin/usuario/view/:id', component: UsuarioAdminViewRoutedComponent },
  { path: 'admin/usuario/create', component: UsuarioAdminCreateRoutedComponent, pathMatch: 'full' },
  { path: 'admin/usuario/delete/:id', component: UsuarioAdminDeleteRoutedComponent },

    { path: 'admin/asiento/plist', component: AsientoAdminPlistRoutedComponent },
  { path: 'admin/asiento/edit/:id', component: AsientoAdminEditRoutedComponent },
  { path: 'admin/asiento/view/:id', component: AsientoAdminViewRoutedComponent },
  { path: 'admin/asiento/create', component: AsientoAdminCreateRoutedComponent, pathMatch: 'full' },
  { path: 'admin/asiento/delete/:id', component: AsientoAdminDeleteRoutedComponent },
  
  { path: 'admin/apunte/plist', component: ApunteAdminPlistRoutedComponent },
  { path: 'admin/apunte/edit/:id', component: ApunteAdminEditRoutedComponent },
  { path: 'admin/apunte/view/:id', component: ApunteAdminViewRoutedComponent },
  { path: 'admin/apunte/create', component: ApunteAdminCreateRoutedComponent, pathMatch: 'full' },
  { path: 'admin/apunte/delete/:id', component: ApunteAdminDeleteRoutedComponent },

];
