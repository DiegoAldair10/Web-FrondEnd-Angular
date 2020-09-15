import { Distrito } from './detalle/distrito';
import { Factura } from '../facturas/models/factura';


export class Clientes {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  fecha: string;
  foto: string;
  distrito: Distrito;
  facturas: Array<Factura> = [];
}
