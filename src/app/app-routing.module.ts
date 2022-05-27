import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
export const APP_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then(mod => mod.LoginModule)
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },
  
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
