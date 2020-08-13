import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { SliderComponent } from './slider/slider.component';
import { HttpClientModule } from '@angular/common/http';
/*NG Boostratp */
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProductosComponent } from './productos/productos.component';
import { FormComponent } from './productos/form.component';
import {RouterModule , Routes } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator.component';


const routes: Routes = [
  {path: '', redirectTo: '/productos', pathMatch: 'full'},
  {path: 'productos', component: ProductosComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    BodyComponent,
    SliderComponent,
    ProductosComponent,
    FormComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
