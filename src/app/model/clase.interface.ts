import { IAlumno } from "./alumno.interface";
import { IProfesor } from "./profesor.interface";


export interface IClase {
  id: number;
  asignatura: string;
  tipo: string;
  precio: number;
  hora: number;
  alumno: IAlumno;
  profesor: IProfesor;
}
