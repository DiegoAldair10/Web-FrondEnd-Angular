import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator-clientes',
  templateUrl: './paginator-clientes.component.html',
  styleUrls: ['./paginator-clientes.component.css']
})
export class PaginatorClientesComponent implements OnInit {
  @Input() paginador: any;

  paginas: number[];

  desde: number;
  hasta: number;
  
  constructor() { }

  ngOnInit(): void {

    this.initPaginator();
  }
  ngOnChanges(changes: SimpleChanges) {
    let paginadorActualizado = changes['paginador'];

    if (paginadorActualizado.previousValue) {
      this.initPaginator();
    }

  }

  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginador.number - 6), this.paginador.totalPages - 7);
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 6), 8);


    if (this.paginador.totalPages > 7) {

      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }
  }
}
