import { Autos } from 'src/app/autos/autos';

export class ItemFactura {
  auto: Autos;
  cantidad: number = 1;
  importe: number;

  public calcularImporte(): number {
    return this.cantidad * this.auto.precio;
  }
}
