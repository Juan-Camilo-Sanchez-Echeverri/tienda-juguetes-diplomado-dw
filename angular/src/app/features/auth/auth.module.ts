import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule, SharedModule, LoginComponent],
})
export class AuthModule {}
