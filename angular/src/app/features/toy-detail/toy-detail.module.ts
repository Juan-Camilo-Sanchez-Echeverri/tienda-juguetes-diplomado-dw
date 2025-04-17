import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToyDetailRoutingModule } from './toy-detail-routing.module';
import { ToyDetailComponent } from './toy-detail/toy-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToyDetailRoutingModule,
    SharedModule,
    ToyDetailComponent,
  ],
})
export class ToyDetailModule {}
