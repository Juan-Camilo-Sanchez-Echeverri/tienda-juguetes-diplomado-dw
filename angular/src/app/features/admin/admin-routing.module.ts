import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ToyFormComponent } from './toy-form/toy-form.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'create', component: ToyFormComponent },
  { path: 'edit/:id', component: ToyFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
