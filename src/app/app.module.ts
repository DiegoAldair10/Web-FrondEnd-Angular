import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { SliderComponent } from './slider/slider.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductosComponent } from './productos/productos.component';
import { FormComponent } from './productos/form.component';

/*NG Boostratp */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormsModule } from '@angular/forms';
/*Material*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProductoService } from './productos/producto.service';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos', component: ProductosComponent },
  { path: 'productos/page/:page', component: ProductosComponent },
  { path: 'productos/form', component: FormComponent },
  { path: 'productos/form/:id', component: FormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    BodyComponent,
    SliderComponent,
    ProductosComponent,
    PaginatorComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMomentDateModule,
    MatDatepickerModule,
  ],
  providers: [ProductoService, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
