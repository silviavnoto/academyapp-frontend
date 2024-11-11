
export interface IApunte {
     id : number ;
     debe : number ;
     haber : number;
     descripcion : string;
     comentarios : string; 
     momentstamp:   string;
     orden:  number ;
     id_asiento : number ;
     id_subcuenta : number ;
     id_tipoapunte : number 
}