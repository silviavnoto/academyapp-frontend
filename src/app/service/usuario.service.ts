import { Injectable } from '@angular/core';
import { IUsuario } from '../model/usuario.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverUrl } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  serverUrl: string = serverUrl + '/usuario';
  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IUsuario>> {
    let URL: string = '';
    URL += this.serverUrl;

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
    return this.oHttp.get<IPage<IUsuario>>(URL, httpOptions);
  }

  deleteUser(id: number): Observable<IUsuario> {
    let URL: string = '';
    URL += this.serverUrl;
    URL += '/' + id;
    return this.oHttp.delete<IUsuario>(URL);
  }

  getUser(id: number): Observable<IUsuario> {
    let URL: string = '';
    URL += this.serverUrl;
    URL += '/' + id;
    return this.oHttp.get<IUsuario>(URL);
  }

  updateUser(oUsuario: IUsuario): Observable<IUsuario> {
    let URL: string = '';
    URL += this.serverUrl;
    return this.oHttp.post<IUsuario>(URL, oUsuario);
  }

  createUser(oUsuario: IUsuario): Observable<IUsuario> {
    let URL: string = '';
    URL += this.serverUrl;
    URL += '/create';
    return this.oHttp.put<IUsuario>(URL, oUsuario);
  }
}
