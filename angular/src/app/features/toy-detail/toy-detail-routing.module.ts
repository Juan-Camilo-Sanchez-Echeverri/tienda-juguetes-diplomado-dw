import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToyDetailComponent } from './toy-detail/toy-detail.component';

const routes: Routes = [
  { path: ':id', component: ToyDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToyDetailRoutingModule { }
