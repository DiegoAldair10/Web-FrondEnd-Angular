import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'  

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public producto: Producto = new Producto();
  titulo: string = 'Formulario Productos';
  errores: string[];

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarProducto();
    }

  cargarProducto(): void {
    this.activatedRouter.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.productoService.getProducto(id).subscribe((producto) => this.producto = producto)
      }
    });
  }


  create(): void {
    console.log(this.producto);
    this.productoService.create(this.producto).subscribe(
      (producto) => {
        this.router.navigate(['/productos']);
        swal.fire(
          'Nuevo Producto',
          `El producto  ${producto.nombre} ha sido creado con éxito!`,
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
    console.log(this.producto);
    this.productoService.update(this.producto).subscribe(
      (json) => {
        this.router.navigate(['/productos']);
        swal.fire(
          'Producto Actualizado',
          ` ${json.mensaje}: ${json.producto.nombre}`,
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
