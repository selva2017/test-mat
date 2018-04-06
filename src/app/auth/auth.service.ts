import { ServerService } from './../shared/server.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { UIService } from '../shared/ui.service';
import { UserRegister } from '../shared/user-register';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;
  private newUser: UserRegister;
  token: boolean = false;
  token_name: string;
  role = new EventEmitter<string>();

  constructor(private router: Router, private serviceAuth: ServerService,
    private uiService: UIService) { }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    // this.user = {
    // email: authData.email,
    // userId: Math.round(Math.random() * 10000).toString()
    // password: authData.password
    // };
    // console.log(authData);
    this.serviceAuth.signupUser(authData)
      .subscribe(
      success => {
        // if (success.statusMessage == "AUTH_SUCCESS") {
          // console.log(success);
          this.uiService.showSnackbar("Registration is Successful.", "close", 'blue-snackbar');
          this.router.navigate(['/login']);
        // }
        // else {
        //   this.uiService.showSnackbar("Registration is Not Successful. Please try again with right data.", null, 3000);
        //   this.token = false;
        //   this.uiService.loadingStateChanged.next(false);
        // }
      },
      error => {
        this.uiService.showSnackbar("Registration is Not Successful. Please try again with right data.", "close",'red-snackbar');
        this.router.navigate(['/signup']);
        // alert(error)
      },
      () => console.log('finished')
      );
    // this.authSuccessfully();
    // this.uiService.loadingStateChanged.next(false);
  }

  // login(authData: AuthData) {
  //   this.user = {
  //     email: authData.email,
  //     // userId: Math.round(Math.random() * 10000).toString()
  //   };
  //   this.authSuccessfully();
  // }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.token = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/dashboard']);
  }

  signinUser(user) {
    this.uiService.loadingStateChanged.next(true);
    this.user = user;
    this.serviceAuth.authenticateUser(user)
      .subscribe(
      success => {
        // console.log(success);
        if (success.statusMessage == "AUTH_SUCCESS") {
          this.token = true;
          this.authChange.next(true);
          this.router.navigate(['/dashboard']);
          this.isAdmin(success.role);
          this.token_name = success.token;
          localStorage.setItem('token', this.token_name);
          // localStorage.setItem('role', success.role);
          // localStorage.setItem('companyName', success.companyName);
          localStorage.setItem('companyId', success.companyId);
          // console.log('Company Id -' + success.companyId);
          // console.log('Role -' + success.role);
          this.authSuccessfully();
          this.uiService.loadingStateChanged.next(false);
        }
        else {
          this.token = false;
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackbar("You have entered an invalid username or password", "close",'red-snakbar');
          // this.invalidLogin.emit(true);
        }
      },
      error => alert(error),
      () => console.log('finished')
      );
  }
  isAdmin(role) {
    this.role.emit(role);
  }
}