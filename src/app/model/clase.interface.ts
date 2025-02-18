import { IUsuario } from "./usuario.interface";

export interface IClase {
  id: number;
  asignatura: string;
  precio: number;
  hora: number;
  usuario: IUsuario;
}
