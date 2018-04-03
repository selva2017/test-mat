import { ServerService } from './shared/server.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from './training/current-training/stop-training.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { HttpModule } from '@angular/http';
import { SalesOrdersComponent } from './training/sales-orders/sales-orders.component';
import { OrdersBfgsmsizeComponent } from './training/orders-bfgsmsize/orders-bfgsmsize.component';
import { OrdersBfgsmComponent } from './training/orders-bfgsm/orders-bfgsm.component';
import { SelectedOrdersComponent } from './training/selected-orders/selected-orders.component';
import { TrialBalComponent } from './view/trial-bal/trial-bal.component';
import { DaybookComponent } from './view/daybook/daybook.component';
import { DaybookDialogComponent } from './view/daybook/daybook-dialog.component';
import { InventoryService } from './shared/inventory.service';
import { SalesComponent } from './view/sales/sales.component';
import { StocksComponent } from './view/stocks/stocks.component';
import { ReceiptsComponent } from './view/receipts/receipts.component';
import { ViewComponent } from './view/view.component';
import { DispatchDialogComponent } from './training/sales-orders/dispatch-dialog.component';
import { CustomersComponent } from './view/customers/customers.component';
import { CustomerDialog } from './view/customers/customer-dialog.component';
import { DeleteSalesordersComponent } from './training/delete-salesorders/delete-salesorders.component';
import { RestoreSalesordersComponent } from './training/restore-salesorders/restore-salesorders.component';
import { PlannedComponent } from './training/planned/planned.component';
import { AdminComponent } from './manage/admin/admin.component';
import { PublishComponent } from './manage/publish/publish.component';
import { ManageComponent } from './manage/manage.component';
import { UIService } from './shared/ui.service';
import { AdminExtComponent } from './manage/admin-ext/admin-ext.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent,
    SalesOrdersComponent,
    OrdersBfgsmsizeComponent,
    OrdersBfgsmComponent,
    SelectedOrdersComponent,
    TrialBalComponent,
    DaybookComponent,
    DaybookDialogComponent,
    DispatchDialogComponent,
    SalesComponent,
    StocksComponent,
    ReceiptsComponent,
    ViewComponent,
    CustomersComponent,
    CustomerDialog,
    DeleteSalesordersComponent,
    RestoreSalesordersComponent,
    PlannedComponent,
    AdminComponent,
    AdminExtComponent,
    PublishComponent,
    ManageComponent,
    AdminExtComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [InventoryService,AuthService, TrainingService,ServerService,UIService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent,DaybookDialogComponent,DispatchDialogComponent,CustomerDialog]
})
export class AppModule { }
