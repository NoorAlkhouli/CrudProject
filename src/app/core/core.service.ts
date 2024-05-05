import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private snackBar: MatSnackBar) {}
  openSnackBar(message :string,action :string='ok') {
    this.snackBar.open(message, action,{
      duration: 3000,
      verticalPosition:'top',
    });

  }

  // openSnackBar(message: string, action: string = 'ok') {
  //   const options: MatSnackBarConfig = {
  //     duration: 3000,
  //     verticalPosition: 'top',
  //   };

  //   if (action === 'ok' || action === 'undo') {
  //     this.snackBar.open(message, action, options);
  //   } else {
  //     console.error(
  //       `Invalid action: ${action}. Snack bar action must be 'ok' or 'undo'.`
  //     );
  //   }
  // }
}
