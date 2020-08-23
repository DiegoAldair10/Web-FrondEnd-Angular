import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../producto';
import { ModalService } from './modal.service';
import { ProductoService } from '../producto.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'detalle-producto',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  @Input() producto: Producto;
  titulo: string = 'Detalle del Producto';
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(
    private productoService: ProductoService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {}

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire(
        'Error Seleccionar imagen :',
        'El archivo debe ser del tipo imagen',
        'error'
      );
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire('Error Upload :', 'debe seleccionar una foto', 'error');
    } else {
      this.productoService
        .subirFoto(this.fotoSeleccionada, this.producto.id)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.producto = response.producto as Producto;
            this.modalService.notificarUpload.emit(this.producto);
            Swal.fire(
              'La foto se ha subido con completamente!',
              response.mensaje,
              'success'
            );
          }
        });
    }
  }
  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
