import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Autos } from './autos';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AutosService {
  private urlEndPoint: string = 'http://localhost:8086/sistema/autos';

  constructor(private http: HttpClient, private router: Router) {}

  getProductos(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('AutoService: tap 1');
        (response.content as Autos[]).forEach((auto) =>
          console.log(auto.nombre)
        );
      }),

      map((response: any) => {
        (response.content as Autos[]).map((auto) => {
          auto.nombre = auto.nombre.toUpperCase();
          return auto;
        });
        return response;
      }),
      tap((response) => {
        console.log('AutosService: tap 2');
        (response.content as Autos[]).forEach((auto) =>
          console.log(auto.nombre)
        );
      })
    );
  }

  create(auto: Autos): Observable<Autos> {
    return this.http.post(this.urlEndPoint, auto).pipe(
      map((response: any) => response.auto as Autos),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getAutos(id): Observable<Autos> {
    return this.http.get<Autos>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/autos']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  update(auto: Autos): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${auto.id}`, auto).pipe(
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Autos> {
    return this.http.delete<Autos>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const req = new HttpRequest(
      'POST',
      `${this.urlEndPoint}/upload`,
      formData,
      {
        reportProgress: true,
      }
    );

    return this.http.request(req);
  }
}
