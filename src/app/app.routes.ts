import { Routes } from '@angular/router';
import { UsuarioAdminPlistRoutedComponent } from './component/usuario/usuario.admin.plist.routed/usuario.admin.plist.routed.component';
import { UsuarioAdminEditRoutedComponent } from './component/usuario/usuario.admin.edit.routed/usuario.admin.edit.routed.component';
import { SharedHomeRoutedComponent } from './component/shared/shared.home.routed/shared.home.routed.component';
import { UsuarioAdminViewRoutedComponent } from './component/usuario/usuario.admin.view.routed/usuario.admin.view.routed.component';



export const routes: Routes = [
  { path: '', component: SharedHomeRoutedComponent },
  { path: 'home', component: SharedHomeRoutedComponent },
  { path: 'admin/usuario/plist', component: UsuarioAdminPlistRoutedComponent },
  { path: 'admin/usuario/edit/:id', component: UsuarioAdminEditRoutedComponent },
  { path: 'admin/usuario/view/:id', component: UsuarioAdminViewRoutedComponent },

];
