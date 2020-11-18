import { Component, OnInit } from '@angular/core';
import { Autos } from './autos';
import { AutosService } from './autos.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ModalService } from '.././Modal/modal.service';

import Swal from 'sweetalert2';
import { Clientes } from '../clientes/clientes';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css'],
})
export class AutosComponent implements OnInit {
  autos: Autos[];
  paginador: any;
  autoSeleccionado: Autos;

  constructor(
    private autosServicio: AutosService,
    private modalService: ModalService,
    public authService: AuthService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.autosServicio
        .getProductos(page)
        .pipe(
          tap((reponse) => {
            console.log('AutosComponent: tap 3');
            (reponse.content as Autos[]).forEach((autos) =>
              console.log(autos.nombre)
            );
          })
        )
        .subscribe((response) => {
          this.autos = response.content as Autos[];
          this.paginador = response;
        });
    });
    this.modalService.notificarUpload.subscribe((auto) => {
      this.autos = this.autos.map((autosOriginal) => {
        if (auto.id == autosOriginal.id) {
          autosOriginal.foto = auto.foto;
        }
        return autosOriginal;
      });
    });
  }

  delete(auto: Autos): void {
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
           ${auto.nombre} ${auto.modelo}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar !',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.autosServicio.delete(auto.id).subscribe((response) => {
            this.autos = this.autos.filter((aut) => aut !== auto);
            swalWithBootstrapButtons.fire(
              'Auto Eliminado!',
              `Auto ${auto.nombre} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }

  abrirModal(auto: Autos) {
    this.autoSeleccionado = auto;
    this.modalService.abrirModal();
  }
}
