import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Para obtener los inputs
import { HttpClientModule } from '@angular/common/http';

//Providers
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { InsumosComponent } from './components/insumos/insumos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewPrincipalComponent } from './components/view-principal/view-principal.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import {NgxPaginationModule} from 'ngx-pagination';
const COMPONENT = [
  SidenavComponent,
  ProveedoresComponent,
  AppComponent,
  InsumosComponent,
  DashboardComponent,
  ViewPrincipalComponent,
  PedidosComponent,
  EntradasComponent,
];

@NgModule({
  declarations: [...COMPONENT, SalidasComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    BsModalService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [...COMPONENT],
  bootstrap: [AppComponent],
})
export class AppModule {}
