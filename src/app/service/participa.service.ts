import { Injectable } from '@angular/core';
import { httpOptions, serverURL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IParticipa } from '../model/participa.interface';
import { IPage } from '../environment/model.interface';

@Injectable({
  providedIn: 'root'
})
export class ParticipaService {

serverURL: string = serverURL + '/participa';

  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IParticipa>> {
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
    return this.oHttp.get<IPage<IParticipa>>(URL, httpOptions);
  }

  get(id: number): Observable<IParticipa> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IParticipa>(URL);
  }

  create(oParticipa: IParticipa): Observable<IParticipa> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IParticipa>(URL, oParticipa);
  }

  update(oParticipa: IParticipa): Observable<IParticipa> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IParticipa>(URL, oParticipa);
  }

  getOne(id: number): Observable<IParticipa> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IParticipa>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }

  getPageSubcuenta(id: number){
    return this.oHttp.get<number>(this.serverURL + "/subcuenta/" + id);
  }


  getXBalance(id: number): Observable<IParticipa> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/xbalance/' + id;
    return this.oHttp.get<IParticipa>(URL);
  }


  getPageXBalance(
    page: number,
    size: number,
    id: number
  ): Observable<IPage<IParticipa>> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/xbalance/' + id;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;
    
    return this.oHttp.get<IPage<IParticipa>>(URL, httpOptions);
  }

  getPageXBalanceNoTiene(
    page: number,
    size: number,
    id: number
  ): Observable<IPage<IParticipa>> {
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
    
    return this.oHttp.get<IPage<IParticipa>>(URL, httpOptions);
  }
}
