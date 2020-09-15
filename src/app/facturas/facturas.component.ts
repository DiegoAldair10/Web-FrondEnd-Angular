import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClientesService } from '../clientes/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
//Material
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, flatMap } from 'rxjs/operators';
import { FacturaService } from './services/factura.service';

import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { ItemFactura } from './models/item-factura';
import Swal from 'sweetalert2';
import { Autos } from '../autos/autos';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
})
export class FacturasComponent implements OnInit {
  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();
  autocompleteControl = new FormControl();
  autosFiltrado: Observable<Autos[]>;

  constructor(
    private clienteService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let clienteId = +params.get('clienteId');
      this.clienteService
        .getClientes(clienteId)
        .subscribe((cliente) => (this.factura.cliente = cliente));
    });

    this.autosFiltrado = this.autocompleteControl.valueChanges.pipe(
      map((value) => (typeof value === 'string' ? value : value.nombre)),
      flatMap((value) => (value ? this._filter(value) : []))
    );
  }

  private _filter(value: string): Observable<Autos[]> {
    const filterValue = value.toLowerCase();
    return this.facturaService.filtrarAutos(filterValue);
  }

  mostrarNombre(auto?: Autos): string | undefined {
    return auto ? auto.nombre : undefined;
  }

  seleccionandoAuto(event: MatAutocompleteSelectedEvent): void {
    let auto = event.option.value as Autos;
    console.log(auto);

    if (this.exiteItem(auto.id)) {
      this.incrementaCantidad(auto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.auto = auto;
      this.factura.items.push(nuevoItem);
    }
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.auto.id) {
        item.cantidad = cantidad;
      }

      return item;
    });
  }

  exiteItem(id: number): boolean {
    let existe = false;

    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.auto.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.auto.id) {
        ++item.cantidad;
      }

      return item;
    });
  }
  eliminarItemFactura(id: number): void {
    this.factura.items = this.factura.items.filter(
      (item: ItemFactura) => id !== item.auto.id
    );
  }

  create(facturaForm): void {
    console.log(this.factura);
    if (this.factura.items.length == 0) {
      this.autocompleteControl.setErrors({ invalid: true });
    }
    if (facturaForm.form.valid && this.factura.items.length > 0) {
      this.facturaService.create(this.factura).subscribe((factura) => {
        Swal.fire(
          this.titulo,
          `Factura ${factura.descripcion} creada con éxito`,
          'success'
        );
        this.router.navigate(['/facturas', factura.id]);
      });
    }
  }
}
