import { Distrito } from './detalle/distrito';
import { Factura } from '../facturas/models/factura';

export class Clientes {
  id: number;
  ruc: string;
  nombre: string;
  apellido: string;
  fecha: string;
  dni: string;
  direccion: string;
  telefono: string;
  email: string;
  foto: string;
  distrito: Distrito;
  facturas: Array<Factura> = [];
}
