import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  productos: Producto[];
  paginador: any;
  productoSeleccionado: Producto;

  constructor(
    private productoService: ProductoService,
    private modalService: ModalService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.productoService
        .getProductos(page)
        .pipe(
          tap((reponse) => {
            console.log('ProductoComponent: tap 3');
            (reponse.content as Producto[]).forEach((producto) =>
              console.log(producto.nombre)
            );
          })
        )
        .subscribe((response) => {
          this.productos = response.content as Producto[];
          this.paginador = response;
        });
    });

    this.modalService.notificarUpload.subscribe((producto) => {
      this.productos = this.productos.map((productoOriginal) => {
        if (producto.id == productoOriginal.id) {
          productoOriginal.foto = producto.foto;
        }
        return productoOriginal;
      });
    });
  }

  delete(producto: Producto): void {
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
           ${producto.nombre} ${producto.descripcion}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar !',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.productoService.delete(producto.id).subscribe((response) => {
            this.productos = this.productos.filter((cli) => cli !== producto);
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Cliente ${producto.nombre} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }

  abrirModal(producto: Producto) {
    this.productoSeleccionado = producto;
    this.modalService.abrirModal();
  }
}
