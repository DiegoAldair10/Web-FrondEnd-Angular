import { Component, OnInit } from '@angular/core';
import { Clientes } from './clientes';
import { ClientesService } from './clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Distrito } from './detalle/distrito';

@Component({
  selector: 'app-from',
  templateUrl: './fromCli.component.html',
  styleUrls: ['./fromCli.component.css'],
})
export class FromCliComponent implements OnInit {
  public cliente: Clientes = new Clientes();
  titulo: string = 'Formulario Clientes';
  errores: string[];
  distritos: Distrito[];

  constructor(
    private clientesService: ClientesService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }
  cargarClientes(): void {
    this.activatedRouter.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clientesService
          .getClientes(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
    this.clientesService
      .getDistrito()
      .subscribe((distritos) => (this.distritos = distritos));
  }
  create(): void {
    console.log(this.cliente);
    this.clientesService.create(this.cliente).subscribe(
      (cliente) => {
        this.router.navigate(['/clientes']);
        Swal.fire(
          'Nuevo Cliente',
          `El cliente  ${cliente.nombre} ha sido creado con éxito!`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend : ' + err.status);
        console.error(err.error.errors);
      }
    );
  }
  update(): void {
    console.log(this.cliente);
    this.clientesService.update(this.cliente).subscribe(
      (json) => {
        this.router.navigate(['/clientes']);
        Swal.fire(
          'Cliente Actualizado',
          ` ${json.mensaje}: ${json.cliente.nombre}`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error el backend:' + err.status);
        console.error(err.error.errors);
      }
    );
  }
  compararDistrito(o1: Distrito, o2: Distrito): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }
}
