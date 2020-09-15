import { Clientes } from 'src/app/clientes/clientes';
import { ItemFactura } from './item-factura';
export class Factura {
    id:number;
    descripcion:string;
    observacion:string;
    items: Array<ItemFactura> = [];
    cliente:Clientes;
    total:number;
    fechaAlqui:string;

    calcularGranTotal(): number{
        this.total = 0;
        this.items.forEach((item:ItemFactura) => {
            this.total += item.calcularImporte();
        });
        return this.total;
    }
}
