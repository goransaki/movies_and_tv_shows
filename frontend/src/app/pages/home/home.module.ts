import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {VideoService} from '../../services/video.service';
import {NgxStarsModule} from 'ngx-stars';
import {RateService} from '../../services/rate.service';

export const routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxStarsModule
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
    VideoService,
    RateService
  ]

})
export class HomeModule {
}
