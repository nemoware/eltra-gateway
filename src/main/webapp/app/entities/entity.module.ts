import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'weather',
        loadChildren: () => import('./weathersample/weather/weather.module').then(m => m.WeathersampleWeatherModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class EltraGatewayEntityModule {}
