import { Injectable } from '@angular/core';
import { IAlquiler } from '../model/alquiler.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AlquilerService {
  serverURL: string = serverURL + '/alquiler';

  constructor(private oHttp: HttpClient) { }

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IAlquiler>> {
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
    return this.oHttp.get<IPage<IAlquiler>>(URL, httpOptions);
  }

  get(id: number): Observable<IAlquiler> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IAlquiler>(URL);
  }

  create(oAlquiler: IAlquiler): Observable<IAlquiler> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IAlquiler>(URL, oAlquiler);
  }

  update(oAlquiler: IAlquiler): Observable<IAlquiler> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IAlquiler>(URL, oAlquiler);
  }

  getOne(id: number): Observable<IAlquiler> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IAlquiler>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }

}
