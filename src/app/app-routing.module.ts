import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { InsumosComponent } from './components/insumos/insumos.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
//?import { LoginComponent } from './components/login/login.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    //?component: LoginComponent,
    loadChildren: () =>
      import('./components/login/login.module').then((mod) => mod.LoginModule),
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], //Proviene del auth.guard.ts
  },

  {
    path: 'proveedores',
    component: ProveedoresComponent,
    canActivate: [AuthGuard], //Proviene del auth.guard.ts
  },

  {
    path: 'insumos',
    component: InsumosComponent,
    canActivate: [AuthGuard], //Proviene del auth.guard.ts
  },

  {
    path: 'sidenav',
    component: SidenavComponent,
    canActivate: [AuthGuard], //Proviene del auth.guard.ts
  },

  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
