import { Distrito } from './detalle/distrito';

export class Clientes {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  fecha: string;
  foto: string;
  distrito: Distrito;
  // alquiler:Arry<Alquiler>=[];
}
