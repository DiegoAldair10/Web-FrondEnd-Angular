import { Component, OnInit, Input } from '@angular/core';
import { Autos } from '../autos';
import { AutosService } from '../autos.service';
import { ModalService } from '../../Modal/modal.service';

import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from 'src/app/usuarios/auth.service';
@Component({
  selector: 'detalle-auto',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  @Input() auto: Autos;
  titulo: string = 'Detalle del Auto';
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(
    private autosService: AutosService,
    public authService: AuthService,
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
      this.autosService
        .subirFoto(this.fotoSeleccionada, this.auto.id)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.auto = response.auto as Autos;
            this.modalService.notificarUpload.emit(this.auto);
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
