import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EltraGatewaySharedModule } from 'app/shared/shared.module';

import { TrackerComponent } from './tracker.component';

import { trackerRoute } from './tracker.route';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [EltraGatewaySharedModule, RouterModule.forChild([trackerRoute]), MatCardModule, MatTableModule],
  declarations: [TrackerComponent]
})
export class TrackerModule {}
