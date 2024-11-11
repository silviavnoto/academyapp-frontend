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
import { BalanceAdminPlistRoutedComponent } from './component/balance/balance.admin.plist.routed/balance.admin.plist.routed.component';
import { BalanceAdminCreateRoutedComponent } from './component/balance/balance.admin.create.routed/balance.admin.create.routed.component';
import { BalanceAdminDeleteRoutedComponent } from './component/balance/balance.admin.delete.routed/balance.admin.delete.routed.component';
import { BalanceAdminEditRoutedComponent } from './component/balance/balance.admin.edit.routed/balance.admin.edit.routed.component';
import { BalanceAdminViewRoutedComponent } from './component/balance/balance.admin.view.routed/balance.admin.view.routed.component';



export const routes: Routes = [
  { path: '', component: SharedHomeRoutedComponent },
  { path: 'home', component: SharedHomeRoutedComponent },
  { path: 'admin/usuario/plist', component: UsuarioAdminPlistRoutedComponent },
  { path: 'admin/usuario/edit/:id', component: UsuarioAdminEditRoutedComponent },
  { path: 'admin/usuario/view/:id', component: UsuarioAdminViewRoutedComponent },
  { path: 'admin/usuario/create', component: UsuarioAdminCreateRoutedComponent, pathMatch: 'full' },
  { path: 'admin/usuario/delete/:id', component: UsuarioAdminDeleteRoutedComponent },

  { path: 'admin/apunte/plist', component: ApunteAdminPlistRoutedComponent },
  { path: 'admin/apunte/edit/:id', component: ApunteAdminEditRoutedComponent },
  { path: 'admin/apunte/view/:id', component: ApunteAdminViewRoutedComponent },
  { path: 'admin/apunte/create', component: ApunteAdminCreateRoutedComponent, pathMatch: 'full' },
  { path: 'admin/apunte/delete/:id', component: ApunteAdminDeleteRoutedComponent },

  { path: 'admin/balance/plist', component: BalanceAdminPlistRoutedComponent },
  { path: 'admin/balance/edit/:id', component: BalanceAdminEditRoutedComponent },
  { path: 'admin/balance/view/:id', component: BalanceAdminViewRoutedComponent },
  { path: 'admin/balance/create', component: BalanceAdminCreateRoutedComponent, pathMatch: 'full' },
  { path: 'admin/balance/delete/:id', component: BalanceAdminDeleteRoutedComponent },

];
