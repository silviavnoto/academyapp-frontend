import { Routes } from '@angular/router';

import { SharedHomeRoutedComponent } from './component/shared/shared.home.routed/shared.home.routed.component';

import { AlumnoAdminPlistRoutedComponent } from './component/alumno/alumno.admin.plist.routed/alumno.admin.plist.routed.component';
import { AlumnoAdminEditRoutedComponent } from './component/alumno/alumno.admin.edit.routed/alumno.admin.edit.routed.component';
import { AlumnoAdminViewRoutedComponent } from './component/alumno/alumno.admin.view.routed/alumno.admin.view.routed.component';
import { AlumnoAdminCreateRoutedComponent } from './component/alumno/alumno.admin.create.routed/alumno.admin.create.routed.component';
import { AlumnoAdminDeleteRoutedComponent } from './component/alumno/alumno.admin.delete.routed/alumno.admin.delete.component';

import { ProfesorAdminPlistRoutedComponent } from './component/profesor/profesor.admin.plist.routed/profesor.admin.plist.routed.component';
import { ProfesorAdminEditRoutedComponent } from './component/profesor/profesor.admin.edit.routed/profesor.admin.edit.routed.component';
import { ProfesorAdminViewRoutedComponent } from './component/profesor/profesor.admin.view.routed/profesor.admin.view.routed.component';
import { ProfesorAdminCreateRoutedComponent } from './component/profesor/profesor.admin.create.routed/profesor.admin.create.routed.component';
import { ProfesorAdminDeleteRoutedComponent } from './component/profesor/profesor.admin.delete.routed/profesor.admin.delete.component';

import { ClaseAdminPlistRoutedComponent } from './component/clase/clase.admin.plist.routed/clase.admin.plist.routed.component';
import { ClaseAdminEditRoutedComponent } from './component/clase/clase.admin.edit.routed/clase.admin.edit.routed.component';
import { ClaseAdminViewRoutedComponent } from './component/clase/clase.admin.view.routed/clase.admin.view.routed.component';
import { ClaseAdminCreateRoutedComponent } from './component/clase/clase.admin.create.routed/clase.admin.create.routed.component';
import { ClaseAdminDeleteRoutedComponent } from './component/clase/clase.admin.delete.routed/clase.admin.delete.component';

import { AlquilerAdminPlistRoutedComponent } from './component/alquiler/alquiler.admin.plist.routed/alquiler.admin.plist.routed.component';
import { AlquilerAdminEditRoutedComponent } from './component/alquiler/alquiler.admin.edit.routed/alquiler.admin.edit.routed.component';
import { AlquilerAdminViewRoutedComponent } from './component/alquiler/alquiler.admin.view.routed/alquiler.admin.view.routed.component';
import { AlquilerAdminCreateRoutedComponent } from './component/alquiler/alquiler.admin.create.routed/alquiler.admin.create.routed.component';
import { AlquilerAdminDeleteRoutedComponent } from './component/alquiler/alquiler.admin.delete.routed/alquiler.admin.delete.component';

import { TaquillaAdminPlistRoutedComponent } from './component/taquilla/taquilla.admin.plist.routed/taquilla.admin.plist.routed.component';
import { TaquillaAdminCreateRoutedComponent } from './component/taquilla/taquilla.admin.create.routed/taquilla.admin.create.routed.component';
import { TaquillaAdminViewRoutedComponent } from './component/taquilla/taquilla.admin.view.routed/taquilla.admin.view.routed.component';
import { TaquillaAdminDeleteRoutedComponent } from './component/taquilla/taquilla.admin.delete.routed/taquilla.admin.delete.component';
import { TaquillaAdminEditRoutedComponent } from './component/taquilla/taquilla.admin.edit.routed/taquilla.admin.edit.routed.component';


export const routes: Routes = [
  { path: '', component: SharedHomeRoutedComponent },
  { path: 'home', component: SharedHomeRoutedComponent },

  { path: 'admin/alumno/plist', component: AlumnoAdminPlistRoutedComponent },
  { path: 'admin/alumno/edit/:id', component: AlumnoAdminEditRoutedComponent, },
  { path: 'admin/alumno/view/:id', component: AlumnoAdminViewRoutedComponent, },
  { path: 'admin/alumno/create', component: AlumnoAdminCreateRoutedComponent, pathMatch: 'full', },
  { path: 'admin/alumno/delete/:id', component: AlumnoAdminDeleteRoutedComponent, },

  { path: 'admin/profesor/plist', component: ProfesorAdminPlistRoutedComponent },
  { path: 'admin/profesor/edit/:id', component: ProfesorAdminEditRoutedComponent, },
  { path: 'admin/profesor/view/:id', component: ProfesorAdminViewRoutedComponent, },
  { path: 'admin/profesor/create', component: ProfesorAdminCreateRoutedComponent, pathMatch: 'full', },
  { path: 'admin/profesor/delete/:id', component: ProfesorAdminDeleteRoutedComponent, },

  { path: 'admin/clase/plist', component: ClaseAdminPlistRoutedComponent },
  { path: 'admin/clase/edit/:id', component: ClaseAdminEditRoutedComponent, },
  { path: 'admin/clase/view/:id', component: ClaseAdminViewRoutedComponent, },
  { path: 'admin/clase/create', component: ClaseAdminCreateRoutedComponent, pathMatch: 'full', },
  { path: 'admin/clase/delete/:id', component: ClaseAdminDeleteRoutedComponent, },

  { path: 'admin/taquilla/plist', component: TaquillaAdminPlistRoutedComponent },
  { path: 'admin/taquilla/edit/:id', component: TaquillaAdminEditRoutedComponent, },
  { path: 'admin/taquilla/view/:id', component: TaquillaAdminViewRoutedComponent, },
  { path: 'admin/taquilla/create', component: TaquillaAdminCreateRoutedComponent, pathMatch: 'full', },
  { path: 'admin/taquilla/delete/:id', component: TaquillaAdminDeleteRoutedComponent, },

  { path: 'admin/alquiler/plist', component: AlquilerAdminPlistRoutedComponent },
  { path: 'admin/alquiler/edit/:id', component: AlquilerAdminEditRoutedComponent, },
  { path: 'admin/alquiler/view/:id', component: AlquilerAdminViewRoutedComponent, },
  { path: 'admin/alquiler/create', component: AlquilerAdminCreateRoutedComponent, pathMatch: 'full', },
  { path: 'admin/alquiler/delete/:id', component: AlquilerAdminDeleteRoutedComponent, },

];
