import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { EltraGatewaySharedModule } from 'app/shared/shared.module';
import { EltraGatewayCoreModule } from 'app/core/core.module';
import { EltraGatewayAppRoutingModule } from './app-routing.module';
import { EltraGatewayHomeModule } from './home/home.module';
import { EltraGatewayEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    EltraGatewaySharedModule,
    EltraGatewayCoreModule,
    EltraGatewayHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    EltraGatewayEntityModule,
    EltraGatewayAppRoutingModule,

    BrowserAnimationsModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class EltraGatewayAppModule {}
