import { IClase } from "./clase.interface";
import { IUsuario } from "./usuario.interface";

export interface IParticipa {
  id: number;
  usuario: IUsuario;
  clase: IClase;
}