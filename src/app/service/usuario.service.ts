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
    filtro: string
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
    if (filtro) {
      URL += '&filter=' + filtro;
    }
    return this.oHttp.get<IPage<IUsuario>>(URL);
  }


  get (id: number): Observable<IUsuario> {
    let URL: string = '';
    URL += 'http://localhost:8085';
    URL += '/usuario';
    URL += '/' + id;
    return this.oHttp.get<IUsuario>(URL);
  }

  update (oUsuario: IUsuario): Observable<IUsuario> {
    let URL: string = '';
    URL += 'http://localhost:8085';
    URL += '/usuario';
    return this.oHttp.put<IUsuario>(URL, oUsuario);
  }

}
