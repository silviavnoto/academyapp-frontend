import { Injectable } from '@angular/core';
import { IClase } from '../model/clase.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';
import { throwError } from 'rxjs';
import { ISumas } from '../model/sumas.interface';

@Injectable({
  providedIn: 'root',
})
export class ClaseService {
  serverURL: string = serverURL + '/clase';

  constructor(private oHttp: HttpClient) { }

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IClase>> {
    let URL: string = '';
    URL += this.serverURL;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;
    if (field) {
      URL += '&sort=' + field;
      if (dir === 'asc') {
        URL += ',asc';
      } else {
        URL += ',desc';
      }
    }
    if (filtro) {
      URL += '&filter=' + filtro;
    }
    return this.oHttp.get<IPage<IClase>>(URL, httpOptions);
  }

  /*getPageXUsuario(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string,
    id_usuario: number
  ): Observable<IPage<IClase>> {

    let URL: string = '';
    URL += this.serverURL + '/xusuario/' + id_usuario;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;
    if (field) {
      URL += '&sort=' + field;
      if (dir === 'asc') {
        URL += ',asc';
      } else {
        URL += ',desc';
      }
    }
    if (filtro) {
      URL += '&filter=' + filtro;
    }
    return this.oHttp.get<IPage<IClase>>(URL, httpOptions);
  }

  getTotalClasesXUsuario(id_usuario: number): Observable<ISumas> {
    let URL: string = '';
    URL += this.serverURL + '/xusuario/total/' + id_usuario;
    return this.oHttp.get<ISumas>(URL);
  }*/

  get(id: number): Observable<IClase> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IClase>(URL).pipe(
      catchError(error => {
        console.error('Error obteniendo la clase:', error);
        return throwError(() => new Error('No se pudo obtener la clase. Verifica que tenga un usuario asignado.'));
      })
    );
  }

  create(oClase: IClase): Observable<IClase> {
  //  oClase.usuario.tipousuario.usuarios = [];
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.post<IClase>('/clase/new', oClase);
 //   return this.oHttp.post<IClase>('http://localhost:8085/clase/new', oClase);
  }

 /* create(oClase: IClase): Observable<IClase> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.post<IClase>(URL, oClase, httpOptions);
  }*/

  update(oClase: IClase): Observable<IClase> {  
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IClase>(URL, oClase);
  }

  getOne(id: number): Observable<IClase> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IClase>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }

}
