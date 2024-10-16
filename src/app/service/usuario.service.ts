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
    dir: string
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
    return this.oHttp.get<IPage<IUsuario>>(URL);
  }
}
