import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Factura } from '../models/factura';
import { Autos } from 'src/app/autos/autos';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private urlEndPoint: string = 'http://localhost:8086/sistema/facturas';

  constructor(private http: HttpClient, private router: Router) {}

  getFacturas(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('FacturaService: tap 1');
        (response.content as Factura[]).forEach((factura) =>
          console.log(factura.descripcion)
        );
      }),
      map((response: any) => {
        (response.content as Factura[]).map((factura) => {
          factura.descripcion = factura.descripcion.toUpperCase();
          return factura;
        });
        return response;
      }),
      tap((response) => {
        console.log('FacturaService: tap 2');
        (response.content as Factura[]).forEach((factura) =>
          console.log(factura.descripcion)
        );
      })
    );
  }

  getFactura(id): Observable<Factura> {
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  

  filtrarAutos(term: string): Observable<Autos[]> {
    return this.http.get<Autos[]>(`${this.urlEndPoint}/filtrar-autos/${term}`);
  }
  create(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.urlEndPoint, factura);
  }

  // update(factura: Factura): Observable<any> {
  //   return this.http.put<any>(`${this.urlEndPoint}/${factura.id}`, factura);
  // }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }
}
