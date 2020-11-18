import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutosComponent } from './autos/autos.component';
import { FormComponent } from './autos/form.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FromCliComponent } from './clientes/fromCli.component';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';
import { ListadoFacturaComponent } from './facturas/listado-factura/listado-factura.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
const routes: Routes = [
  //autos
  { path: '', redirectTo: '/autos', pathMatch: 'full' },
  { path: 'autos', component: AutosComponent },
  { path: 'autos/page/:page', component: AutosComponent },
  { path: 'autos/form', component: FormComponent , canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} }, 
  { path: 'autos/form/:id', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  //clientes
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'clientes/form', component: FromCliComponent , canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  {path: 'clientes/form/:id', component: FromCliComponent, canActivate:[AuthGuard , RoleGuard] , data: {role: 'ROLE_ADMIN'}},
  //facturas
  { path: 'facturas', component: ListadoFacturaComponent },
  { path: 'facturas/page/:page', component: ListadoFacturaComponent },
  { path: 'facturas/:id', component: DetalleFacturaComponent },
  { path: 'facturas/form/:clienteId', component: FacturasComponent },
  //login
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
