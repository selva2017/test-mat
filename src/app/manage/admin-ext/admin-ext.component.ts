import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ServerService } from './../../shared/server.service';
import { UserList } from '../../shared/user-list';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-admin-ext',
  templateUrl: './admin-ext.component.html',
  styleUrls: ['./admin-ext.component.css']
})
export class AdminExtComponent implements OnInit {
  subscription: Subscription;
  userList: UserList[] = [];
  dataSource = new MatTableDataSource<UserList>();
  displayedColumns = ['role', 'authenticate', 'userName', 'userStatus', 'roleName'];

  status: string;
  role: string;
  disableUpdate: boolean = true;
  check = false;
  showLoader: boolean;


  isLoading = false;
  private loadingSubs: Subscription;
  constructor(private serverService: ServerService, private uiService: UIService) {
    this.showLoader = true;
  }
  setStatus(row) {
    this.disableUpdate = false;
    row.authenticate = 1;
    if (row.userStatus == 'active') {
      row.userStatus = 'inactive';
    } else if (row.userStatus == 'inactive') {
      row.userStatus = 'active';
    };
    this.status = row.userStatus;
  }
  setRole(row, value: string) {
    // console.log(value);
    this.role = value;
    this.disableUpdate = false;
    row.authenticate = 1;
  }
  onUpdateExternalUser(key) {
    // console.log("Modal clicked..." + key)
    // key.userStatus = this.status;
    this.status ? key.userStatus = this.status : '';
    // key.role = this.role;
    // this.role ? key.role = this.role : '';
    // console.log("After ..." + key)
    // console.log(JSON.stringify(key));

    this.serverService.updateExternalUser(key)
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
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.showLoader = true;
    this.uiService.loadingStateChanged.next(true);
    this.subscription = this.serverService.getExternalUsers().
      subscribe(list => {
        this.userList = list;
        // console.log("this.userlist");
        // console.log(this.userList);
        this.dataSource.data = list;
        this.showLoader = false;
        this.uiService.loadingStateChanged.next(false);
      },
      error => {
      }
      );
    this.showLoader = false;
  }
  ngAfterViewInit() {
    // this.showLoader = true;
  }
}
