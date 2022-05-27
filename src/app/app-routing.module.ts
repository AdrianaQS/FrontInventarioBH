import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
//? import { LoginComponent } from './components/login/login.component';
export const APP_ROUTES: Routes = [
  {
    path: 'login',
    //? component: LoginComponent,
    loadChildren: () =>
      import('./components/login/login.module').then((mod) => mod.LoginModule),
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
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
