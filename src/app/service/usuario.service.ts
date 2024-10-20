import { Injectable } from '@angular/core';
import { IUsuario } from '../model/usuario.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService {

  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filter: string
  ): Observable<IPage<IUsuario>> {
    let URL: string = '';
    URL += 'http://localhost:8085';
    URL += '/usuario';
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
    if (filter) {
      URL += '&filter=' + filter;
    }
    return this.oHttp.get<IPage<IUsuario>>(URL);
  }

  getPageSort(page: number, size: number, sort: string): Observable<IPage<IUsuario>> {
    if (!page) {
      page = 0;
    }
    if (!size) {
      size = 10;
    }
    if (!sort) {
      sort = 'id,asc';
    }
    return this.oHttp.get<IPage<IUsuario>>(
      'http://localhost:8085' + '/usuario?page=' + page + '&size=' + size + '&sort=' + sort
    );
  }


}
