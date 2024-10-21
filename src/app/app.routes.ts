import { Routes } from '@angular/router';
import { UsuarioAdminPlistRoutedComponent } from './component/usuario/admin/plist/routed/usuario.admin.plist.routed/usuario.admin.plist.routed.component';
import { UsuarioAdminEditRoutedComponent } from './component/usuario/admin/plist/routed/usuario.admin.edit.routed/usuario.admin.edit.routed.component';



export const routes: Routes = [
  { path: 'admin/usuario/plist', component: UsuarioAdminPlistRoutedComponent },
  { path: 'admin/usuario/edit/:id', component: UsuarioAdminEditRoutedComponent },

];
