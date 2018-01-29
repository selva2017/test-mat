import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        // validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  // onSubmit() {
  //   this.authService.login({
  //     email: this.loginForm.value.email,
  //     password: this.loginForm.value.password
  //   });
  // }
  onSubmit(form: NgForm) {
    // this.user.email = form.value.email;
    // this.user.password = form.value.password;
    // console.log(this.loginForm.value.email, this.loginForm.value.password);
    this.authService.signinUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
    // if (!this.authService.isAuthenticated())
    //   this.error_msg = "Invalid username or password.";
    // else
    // this.error_msg = "";
  }
}
