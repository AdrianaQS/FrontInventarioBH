import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { InsumosComponent } from './components/insumos/insumos.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ViewPrincipalComponent } from './components/view-principal/view-principal.component';
import { LoginComponent } from './components/login/login.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { SalidasComponent } from './components/salidas/salidas.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: 'inventario',
    component: ViewPrincipalComponent,
    children: [
      // { path: '', redirectTo: 'login', pathMatch: 'full' },
      // { path: 'login', component: LoginComponent },
      {
        path: 'tablero-principal',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'proveedor',
        component: ProveedoresComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'insumos',
        component: InsumosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'pedidos',
        component: PedidosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'entradas',
        component: EntradasComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'salidas',
        component: SalidasComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
