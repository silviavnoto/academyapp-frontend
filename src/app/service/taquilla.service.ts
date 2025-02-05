import { Injectable } from '@angular/core';
import { ITaquilla } from '../model/taquilla.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TaquillaService {
  serverURL: string = serverURL + '/taquilla';

  constructor(private oHttp: HttpClient) { }

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<ITaquilla>> {
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
    return this.oHttp.get<IPage<ITaquilla>>(URL, httpOptions);
  }

  get(id: number): Observable<ITaquilla> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ITaquilla>(URL);
  }

  create(oTaquilla: ITaquilla): Observable<ITaquilla> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<ITaquilla>(URL, oTaquilla);
  }

  update(oTaquilla: ITaquilla): Observable<ITaquilla> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<ITaquilla>(URL, oTaquilla);
  }

  getOne(id: number): Observable<ITaquilla> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ITaquilla>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }

  flip(oTaquilla: ITaquilla): Observable<ITaquilla> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/flip';
    return this.oHttp.put<ITaquilla>(URL + "/" + oTaquilla.id, oTaquilla);
  }
}
