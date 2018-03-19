import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TrainingService } from './training.service';
import { MatTabChangeEvent } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;
  exerciseSubscription: Subscription;
  showDeleteSO: boolean = false;
  showRestoreSO: boolean = false;
  showPlanned: boolean = false;

  constructor(private trainingService: TrainingService, private router: Router) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        if (exercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );
  }
  // _setDataSource(indexNumber) {
  //   setTimeout(() => {
  //     switch (indexNumber) {
  //       case 0:
  //         console.log("0");
  //         // !this.dataSource.paginator ? this.dataSource.paginator = this.paginator1 : null;
  //         // this.showAllSalesOrders = true;
  //         // this.modifyProductionPlan_right = false;
  //         // this.prodution_plan_details_selected_right = false;
  //         // break;
  //       // case 1:
  //       //   console.log("1");
  //       //   !this.dataSource2.paginator ? this.dataSource2.paginator = this.paginator2 : null;
  //       //   this.showAllSalesOrders = false;
  //       //   this.showSelectedOrders = true;
  //       //   this.modifyProductionPlan_right = false;
  //       //   this.prodution_plan_details_selected_right = false;
  //       //   break;
  //       case 1:
  //       console.log("index 1");
  //         // !this.dataSource_delete.paginator ? this.dataSource_delete.paginator = this.paginator3 : null;
  //         // this.showAllSalesOrders = false;
  //         // this.showSelectedOrders = false;
  //         // break;
  //         case 2:
  //         console.log("index 2");
  //         // !this.dataSource_restore.paginator ? this.dataSource_restore.paginator = this.paginator4 : null;
  //         // this.showAllSalesOrders = false;
  //         // this.showSelectedOrders = false;
  //         break;
  //         case 3:
  //         console.log("index 3");
  //         // this.salesOrdersPlanned = [];
  //         // this.onEditProductionPlans();
  //         // this.dataSource_prodplans.data = this.salesOrdersPlanned;
  //         // // this.showReelInStock_prod_plan = true;
  //         // this.prodution_plan_details_selected_main = true;
  //         // this.prodution_plan_details_selected_details = false;
  //         // this.prodution_plan_details_selected_right = false;
  //         // this.modifyProductionPlan_right = false;
  //         // this.modifyProductionPlan_main = false;
  //         // this.showSelectedOrders = false;
  //         // this.showAllSalesOrders = false;
  //         // break;
  //         // case 5:
  //       //   // !this.dataSource_avail_so_pp.paginator ? this.dataSource_avail_so_pp.paginator = this.paginator5 : null;
  //       //   // this.dataSource_prodplans.data = this.salesOrdersPlanned;
  //       //   this.onEditProductionPlans();
  //       //   this.dataSource_prodplans.data = this.salesOrdersPlanned;
  //       //   // this.dataSource_avail_so_pp.data = this.salesOrder;
  //       //   this.prodution_plan_details_selected_right = false;
  //       //   this.modifyProductionPlan_main = true;
  //       //   this.modifyProductionPlan_details = false;
  //       //   this.modifyProductionPlan_right = false;
  //       //   this.showSelectedOrders = false;
  //       //   this.showAllSalesOrders = false;
  //     }
  //   });
  // }

  onLinkClick(event: MatTabChangeEvent) {
    // console.log('event => ', event);
    // console.log('index => ', event.index);
    // console.log('tab => ', event.tab);
    if (event.tab.textLabel == "Sales Orders") {
      console.log("Sales Orders");
      //     this.showLoader = false;
      //     !this.dataSource.paginator ? this.dataSource.paginator = this.paginator1 : null;
      //     this.showAllSalesOrders = true;
      //     this.modifyProductionPlan_right = false;
      //     this.prodution_plan_details_selected_right = false;
      //     this.showPlansInProduction(false);
    }
    //   if (event.tab.textLabel == "Selected Orders") {
    //     // console.log("Sales Orders");
    //     this.showPlansInProduction(false);
    //   }
    if (event.tab.textLabel == "Delete Sales Orders") {
      console.log("Delete Sales Orders");
      this.showDeleteSO = true;
      // this.router.navigate(['/deleteso']);
      //     this.dataSource_delete.data = [];
      //     this.showLoader = true;
      //     // !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
      //     this.showAllSalesOrders = true;
      //     this.modifyProductionPlan_right = false;
      //     this.prodution_plan_details_selected_right = false;
      //     this.subscription = this.serverService.getActiveSalesOrders().
      //       subscribe(list => {
      //         this.dataSource_delete.data = list;
      //         this.showLoader = false;
      //       })
    }
    if (event.tab.textLabel == "Restore Sales Orders") {
      console.log("Restore Sales Orders");
      this.showRestoreSO = true;
      //     this.dataSource_restore.data = [];
      //     this.showLoader = true;
      //     // !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
      //     this.showAllSalesOrders = true;
      //     this.modifyProductionPlan_right = false;
      //     this.prodution_plan_details_selected_right = false;
      //     this.subscription = this.serverService.getInActiveSalesOrders().
      //       subscribe(list => {
      //         this.dataSource_restore.data = list;
      //         this.showLoader = false;
      //       })
    }
    if (event.tab.textLabel == "Planned") {
      console.log("planned");
      this.showPlanned = true;
      //     this.showPlansInProduction(true);
      //     // console.log("Restore Sales Orders");
      //     // this.showLoader = true;
      //     // this.salesOrdersPlanned = [];
      //     // this.onViewProductionPlans();
      //     // this.dataSource_prodplans.data = this.salesOrdersPlanned;
      //     // // this.showReelInStock_prod_plan = true;
      //     // this.prodution_plan_details_selected_main = true;
      //     // this.prodution_plan_details_selected_details = false;
      //     // this.prodution_plan_details_selected_right = false;
      //     // this.modifyProductionPlan_right = false;
      //     // this.modifyProductionPlan_main = false;
      //     // this.showSelectedOrders = false;
      //     // this.showAllSalesOrders = false;
    }
  }

}
