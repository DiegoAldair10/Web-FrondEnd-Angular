import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { SliderComponent } from './slider/slider.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductosComponent } from './productos/productos.component';
import { FormComponent } from './productos/form.component';
/*NG Boostratp */
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule , Routes } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormsModule} from '@angular/forms';

// /*Material*/
// import { MatMomentDateModule } from '@angular/material-moment-adapter';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';



const routes: Routes = [
  {path: '', redirectTo: '/productos', pathMatch: 'full'},
  {path: 'productos', component: ProductosComponent}, 
  {path: 'productos/page/:page', component: ProductosComponent},
  {path: 'productos/form', component: FormComponent},
  {path: 'productos/form/:id', component: FormComponent}

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
    HttpClientModule,
     FormsModule
    // MatDatepickerModule,
    // MatMomentDateModule,
    // MatAutocompleteModule,
    // MatInputModule,
    // MatFormFieldModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
