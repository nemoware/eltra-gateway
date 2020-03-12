import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EltraGatewaySharedModule } from 'app/shared/shared.module';

import { GatewayComponent } from './gateway.component';

import { gatewayRoute } from './gateway.route';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [EltraGatewaySharedModule, RouterModule.forChild([gatewayRoute]), MatCardModule, MatButtonModule, MatTableModule, MatSortModule],
  declarations: [GatewayComponent]
})
export class GatewayModule {}
