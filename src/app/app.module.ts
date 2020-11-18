import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
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
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*Material*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { FacturasComponent } from './facturas/facturas.component';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { DetalleClienteComponent } from './clientes/detalle/detalle-cliente.component';
import { ListadoFacturaComponent } from './facturas/listado-factura/listado-factura.component';
import { PaginatorFacturasComponent } from './paginator-facturas/paginator-facturas.component';
import { ClientesService } from './clientes/clientes.service';
import { LoginComponent } from './usuarios/login.component';

import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';

registerLocaleData(localeES, 'es');

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
    FacturasComponent,
    ListadoFacturaComponent,
    PaginatorFacturasComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule, //.forRoot(routes),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressBarModule
  ],
  providers: [
    ClientesService,
    AutosService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
