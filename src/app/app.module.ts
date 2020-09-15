import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AutosComponent } from './autos/autos.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormComponent } from './autos/form.component';
import { DetalleComponent } from './autos/detalle/detalle.component';
import { AutosService } from './autos/autos.service';
import { ClientesComponent } from './clientes/clientes.component';

import { FromCliComponent } from './clientes/fromCli.component';
import { PaginatorClientesComponent } from './paginator-clientes/paginator-clientes.component';

/*NG Boostratp */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*Material*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { FacturasComponent } from './facturas/facturas.component';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { DetalleClienteComponent } from './clientes/detalle/detalle-cliente.component';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  { path: '', redirectTo: '/autos', pathMatch: 'full' },
  { path: 'autos', component: AutosComponent },
  { path: 'autos/page/:page', component: AutosComponent },
  { path: 'autos/form', component: FormComponent },
  { path: 'autos/form/:id', component: FormComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'clientes/form', component: FromCliComponent },
  { path: 'clientes/form/:id', component: FromCliComponent },
  { path: 'facturas/:id', component: DetalleFacturaComponent },
  { path: 'facturas/form/:clienteId', component: FacturasComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PaginatorComponent,
    AutosComponent,
    FormComponent,
    DetalleComponent,
    ClientesComponent,
    FromCliComponent,
    PaginatorClientesComponent,
    DetalleFacturaComponent,
    DetalleClienteComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [AutosService, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
