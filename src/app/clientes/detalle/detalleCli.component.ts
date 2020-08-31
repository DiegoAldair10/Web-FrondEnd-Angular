import { Component, OnInit, Input } from '@angular/core';
import { Clientes } from '../clientes';
import { ClientesService } from '../clientes.service';
import { ModalService } from 'src/app/Modal/modal.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalleCli.component.html',
  styleUrls: ['./detalleCli.component.css'],
})
export class DetalleCliComponent implements OnInit {
  @Input() cliente: Clientes;
  titulo: string = 'Detalle del Cliente';
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(
    private clientesService: ClientesService,
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
      this.clientesService
        .subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as Clientes;
            this.modalService.notificarUpload.emit(this.cliente);
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
