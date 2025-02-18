import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpOptions, serverURL } from '../environment/environment';
import { IUsuario } from '../model/usuario.interface';
import { IPage } from '../environment/model.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  serverURL: string = serverURL + '/usuario';

constructor(private oHttp: HttpClient) { }


getPage(
  page: number,
  size: number,
  field: string,
  dir: string,
  filtro: string
): Observable<IPage<IUsuario>> {
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
  return this.oHttp.get<IPage<IUsuario>>(URL, httpOptions);
}

get(id: number): Observable<IUsuario> {
  if (!id || isNaN(id)) {
    console.error('ID no definido o inválido, no se puede hacer la solicitud');
    return new Observable<IUsuario>();  // Retorna un observable vacío para evitar errores
  }
  let URL: string = '';
  URL += this.serverURL;
  URL += '/' + id;
  return this.oHttp.get<IUsuario>(URL);
}

create(oUsuario: IUsuario): Observable<IUsuario> {
  let URL: string = '';
  URL += this.serverURL;
  return this.oHttp.post<IUsuario>('http://localhost:8085/usuario/new', oUsuario);
}

update(oUsuario: IUsuario): Observable<IUsuario> {
  let URL: string = '';
  URL += this.serverURL;
  return this.oHttp.put<IUsuario>(URL, oUsuario);
}

getOne(id: number): Observable<IUsuario> {
  let URL: string = '';
  URL += this.serverURL;
  URL += '/' + id;
  return this.oHttp.get<IUsuario>(URL);
}

getUsuarioByEmail(email: string): Observable<IUsuario> {
  let URL: string = '';
  URL += this.serverURL + '/byemail';
  URL += '/' + email;
  return this.oHttp.get<IUsuario>(URL);
}

delete(id: number) {
  return this.oHttp.delete(this.serverURL + '/' + id);
}

getPageXBalanceNoTiene(
  page: number,
  size: number,
  id: number
): Observable<IPage<IUsuario>> {
  let URL: string = '';
  URL += this.serverURL;
  URL += '/xbalancenotiene/' + id;
  if (!page) {
    page = 0;
  }
  URL += '?page=' + page;
  if (!size) {
    size = 10;
  }
  URL += '&size=' + size;
  
  return this.oHttp.get<IPage<IUsuario>>(URL, httpOptions);
}

}