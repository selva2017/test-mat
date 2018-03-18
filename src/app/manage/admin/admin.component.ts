import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ServerService } from './../../shared/server.service';
import { UserList } from '../../shared/user-list';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  subscription: Subscription;
  userList: UserList[] = [];
  status: string;
  role: string;
  disableUpdate: boolean = true;
  check = false;
  showLoader: boolean;
  constructor(private serverService: ServerService) {
    this.showLoader = true;
  }
  setStatus(row, value: string) {
    this.status = value;
    this.disableUpdate = false;
    row.authenticate = 1;
  }
  setRole(row, value: string) {
    // console.log(value);
    this.role = value;
    this.disableUpdate = false;
    row.authenticate = 1;
  }
  onClickReviewed(key) {
    // console.log("Modal clicked..." + key)
    // key.userStatus = this.status;
    this.status ? key.userStatus = this.status : '';
    // key.role = this.role;
    this.role ? key.role = this.role : '';
    // console.log("After ..." + key)
    // console.log(JSON.stringify(key));

    this.serverService.updateUsers(key)
      .subscribe(
      // (res: Daybook) => console.log(res),
      (success) => {
        // console.log("success");
        this.disableUpdate = true;
        key.authenticate = 0;
        // this.refreshList();
        this.showLoader = false;
      },
      (error) => console.log(error.status)
      );
    }
    ngOnInit() {
      this.subscription = this.serverService.getUserRoles().
      subscribe(list => {
        this.userList = list;
        // console.log("this.userlist");
        // console.log(this.userList);
        this.showLoader = false;
      },
      error => {
      }
      );
  }
  ngAfterViewInit() {
    this.showLoader = true;
  }
}
