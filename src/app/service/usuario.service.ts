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

  getPage(page: number, size: number): Observable<IPage<IUsuario>> {
    return this.oHttp.get<IPage<IUsuario>>(
      'http://localhost:8085' + '/usuario?page=' + page + '&size=' + size
    );
  }

  getPageSort(page: number, size: number, sort: string): Observable<IPage<IUsuario>> {
    return this.oHttp.get<IPage<IUsuario>>(
      'http://localhost:8085' + '/usuario?page=' + page + '&size=' + size + '&sort=' + sort
    );
  }
}
