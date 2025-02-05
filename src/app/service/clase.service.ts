import { Injectable } from '@angular/core';
import { IClase } from '../model/clase.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';
import { IProfesor } from '../model/profesor.interface';
import { IAlumno } from './../model/alumno.interface';

@Injectable({
  providedIn: 'root',
})
export class ClaseService {
  serverURL: string = serverURL + '/clase';

  constructor(private oHttp: HttpClient) { }

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IClase>> {
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
    return this.oHttp.get<IPage<IClase>>(URL, httpOptions);
  }

  get(id: number): Observable<IClase> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IClase>(URL);
  }

  create(oClase: IClase): Observable<IClase> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IClase>(URL, oClase);
  }

  update(oClase: IClase): Observable<IClase> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IClase>(URL, oClase);
  }

  getOne(id: number): Observable<IClase> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IClase>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }

  setAlumno(id: number, id_alumno: number): Observable<IClase> {
    return this.oHttp.put<IClase>(this.serverURL + '/setalumno/' + id + '/' + id_alumno, null);
  }

  setProfesor(id: number, id_profesor: number): Observable<IProfesor> {
    return this.oHttp.put<IProfesor>(this.serverURL + '/setprofesor/' + id + '/' + id_profesor, null);
  }
}
