import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Factura } from '../models/factura';
import { FacturaService } from '../services/factura.service';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { AuthService } from 'src/app/usuarios/auth.service';

@Component({
  selector: 'app-listado-factura',
  templateUrl: './listado-factura.component.html',
  styleUrls: ['./listado-factura.component.css'],
})
export class ListadoFacturaComponent implements OnInit {
  facturas: Factura[];
  paginador: any;
  facturaSeleccionado: Factura;

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'id',
    'Clientes',
    'Descripcion',
    'Observacion',
    'Fecha Alquiler',
    'Ver',
    'Eliminar',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private facturaService: FacturaService,
    public authService: AuthService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.facturaService
        .getFacturas(page)
        .pipe(
          tap((reponse) => {
            console.log('ClientesComponent: tap 3');
            (reponse.content as Factura[]).forEach((facturas) =>
              console.log(facturas.cliente)
            );
          })
        )
        .subscribe((response) => {
          this.facturas = response.content as Factura[];
          this.paginador = response;
        });
    });
  }

  delete(factura: Factura): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Estas Seguro ',
        text: `Seguro que deseas elimiar el factura
           ${factura.descripcion} ${factura.descripcion}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar !',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.facturaService.delete(factura.id).subscribe((response) => {
            this.facturas = this.facturas.filter((cli) => cli !== factura);
            swalWithBootstrapButtons.fire(
              'Factura Eliminado!',
              `Factura ${factura.descripcion} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }
}
