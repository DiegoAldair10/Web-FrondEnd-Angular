import { Component, OnInit, ViewChild } from '@angular/core';
import { Clientes } from './clientes';
import { ClientesService } from './clientes.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ModalService } from '.././Modal/modal.service';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../usuarios/auth.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'Nombre','Apellido','Dni','Fecha','Detalle','Editar','Eliminar'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  clientes: Clientes[]  ;
  paginador: any;
  clienteSeleccionado: Clientes;

  constructor(
    private clientesService: ClientesService,
    private activateRoute: ActivatedRoute,
    public authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clientesService
        .getProductos(page)
        .pipe(
          tap((reponse) => {
            console.log('ClientesComponent: tap 3');
            (reponse.content as Clientes[]).forEach((clientes) =>
              console.log(clientes.nombre)
            );
          })
        )
        .subscribe((response) => {
          this.clientes = response.content as Clientes[];
          this.paginador = response;
        });
    });
    this.modalService.notificarUpload.subscribe((cliente) => {
      this.clientes = this.clientes.map((clientesOriginal) => {
        if (cliente.id == clientesOriginal.id) {
          clientesOriginal.foto = cliente.foto;
        }
        return clientesOriginal;
      });
    });
  }

  delete(cliente: Clientes): void {
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
        text: `Seguro que deseas elimiar el producto
           ${cliente.nombre} ${cliente.apellido}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar !',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.clientesService.delete(cliente.id).subscribe((response) => {
            this.clientes = this.clientes.filter((cli) => cli !== cliente);
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }

  abrirModal(cliente: Clientes) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

}
