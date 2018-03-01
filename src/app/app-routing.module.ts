import { TrialBalComponent } from './view/trial-bal/trial-bal.component';
import { SalesOrdersComponent } from './training/sales-orders/sales-orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { AuthGuard } from './auth/auth.guard';
import { DaybookComponent } from './view/daybook/daybook.component';
import { SalesComponent } from './view/sales/sales.component';
import { ReceiptsComponent } from './view/receipts/receipts.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
  // { path: 'plan', component: SalesOrdersComponent },
  { path: 'plan', component: SalesOrdersComponent, canActivate: [AuthGuard] },
  { path: 'trial-bal', component: TrialBalComponent, canActivate: [AuthGuard] },
  { path: 'daybook', component: DaybookComponent, canActivate: [AuthGuard] },
  { path: 'view', component: ViewComponent, canActivate: [AuthGuard] },
  { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },
  { path: 'receipts', component: ReceiptsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
