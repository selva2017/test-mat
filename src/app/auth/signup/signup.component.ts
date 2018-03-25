import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  invalidLogin: boolean = false;
  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    if (form.value.password != form.value.confirmPassword) {
      this.uiService.showSnackbar("Password does not match. Please enter correct Password.", "close", 'red-snackbar');
 
      // this.invalidLogin = true;
      // form.value.password = "";
      // form.value.confirmPassword = "";
    }
    else {
      this.authService.registerUser({
        email: form.value.email,
        password: form.value.password,
        confirmPassword: form.value.confirmPassword,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        companyId: form.value.companyId
      });
    }
  }

}
