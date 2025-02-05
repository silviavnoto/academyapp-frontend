import { Injectable } from '@angular/core';
import { IProfesor } from '../model/profesor.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  serverURL: string = serverURL + '/profesor';

  constructor(private oHttp: HttpClient) { }

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IProfesor>> {
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
    return this.oHttp.get<IPage<IProfesor>>(URL, httpOptions);
  }

  get(id: number): Observable<IProfesor> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IProfesor>(URL);
  }

  create(oProfesor: IProfesor): Observable<IProfesor> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IProfesor>(URL, oProfesor);
  }

  update(oProfesor: IProfesor): Observable<IProfesor> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IProfesor>(URL, oProfesor);
  }

  getOne(id: number): Observable<IProfesor> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IProfesor>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }

}
