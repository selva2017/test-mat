import { ServerService } from './../shared/server.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;
  token: boolean = false;
  token_name: string;

  constructor(private router: Router, private serviceAuth: ServerService) { }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      // userId: Math.round(Math.random() * 10000).toString()
      password: authData.password
    };
    this.authSuccessfully();
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
    this.router.navigate(['/training']);
  }

  signinUser(user) {
    this.user=user;
    this.serviceAuth.authenticateUser(user)
      .subscribe(
      success => {
        console.log(success);

        if (success.statusMessage == "AUTH_SUCCESS") {
          this.token = true;
          this.authChange.next(true);
          this.router.navigate(['/training']);
          // this.isAdmin(success.role);
          this.token_name = success.token;
          localStorage.setItem('token', this.token_name);
          localStorage.setItem('role', success.role);
          // localStorage.setItem('companyName', success.companyName);
          localStorage.setItem('companyId', success.companyId);
          console.log('Company Id -' + success.companyId);
          console.log('Role -' + success.role);
          this.authSuccessfully();
        }
        else {
          this.token = false;
          // this.invalidLogin.emit(true);
        }
      },
      error => alert(error),
      () => console.log('finished')
      );
  }

}
