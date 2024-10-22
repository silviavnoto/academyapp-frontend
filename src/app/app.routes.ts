import { Routes } from '@angular/router';
import { UsuarioAdminPlistRoutedComponent } from './component/usuario/admin/plist/routed/usuario.admin.plist.routed/usuario.admin.plist.routed.component';
import { UsuarioAdminEditRoutedComponent } from './component/usuario/admin/plist/routed/usuario.admin.edit.routed.component/usuario.admin.edit.routed.component.component';
import { UsuarioAdminViewRoutedComponent } from './component/usuario/admin/plist/routed/usuario.admin.view.routed.component/usuario.admin.view.routed.component.component';
import { UsuarioAdminRemoveComponent } from './component/usuario/admin/plist/routed/usuario.admin.remove.routed/UsuarioAdminRemove.component';
import { UsuarioAdminCreateRoutedComponent } from './component/usuario/admin/plist/routed/usuario.admin.create.routed/usuario.admin.create.routed.component';


export const routes: Routes = [
  { path: 'admin/usuario/plist', component: UsuarioAdminPlistRoutedComponent },
  { path: 'admin/usuario/remove/:id', component: UsuarioAdminRemoveComponent },
  { path: 'admin/usuario/edit/:id', component:UsuarioAdminEditRoutedComponent },
  { path: 'admin/usuario/view/:id', component:UsuarioAdminViewRoutedComponent },
  { path: 'admin/usuario/create', component:UsuarioAdminCreateRoutedComponent },



];
