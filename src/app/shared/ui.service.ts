import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService{

    constructor(private snackbar: MatSnackBar) {}

    loadingStateChanged = new Subject<boolean>();
    showSnackbar(message: string, action: string, className: string) {
        this.snackbar.open(message, action, {
          duration: 3000,
          extraClasses: [className]
        });
      }
}