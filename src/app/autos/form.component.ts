import { Component, OnInit } from '@angular/core';
import { Autos } from './autos';
import { AutosService } from './autos.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public auto: Autos = new Autos();
  titulo: string = 'Formulario Autos';
  errores: string[];

  constructor(
    private autosService: AutosService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarAuto();
  }
  cargarAuto(): void {
    this.activatedRouter.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.autosService.getAutos(id).subscribe((auto) => (this.auto = auto));
      }
    });
  }
  create(): void {
    console.log(this.auto);
    this.autosService.create(this.auto).subscribe(
      (auto) => {
        this.router.navigate(['/autos']);
        Swal.fire(
          'Nuevo Auto',
          `El auto  ${auto.nombre} ha sido creado con éxito!`,
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
    console.log(this.auto);
    this.autosService.update(this.auto).subscribe(
      (json) => {
        this.router.navigate(['/autos']);
        Swal.fire(
          'Auto Actualizado',
          ` ${json.mensaje}: ${json.auto.nombre}`,
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
}
