import { IAlumno } from "./alumno.interface";
import { ITaquilla } from "./taquilla.interface";


export interface IAlquiler {
  id: number;
  inicio: Date;
  fin: Date;
  precio: number;
  alumno: IAlumno;
  taquilla: ITaquilla;
}
