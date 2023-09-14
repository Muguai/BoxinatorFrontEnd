import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user-snackbar',
  templateUrl: './delete-user-snackbar.component.html',
  styleUrls: ['./delete-user-snackbar.component.scss']
})
export class DeleteUserSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string,
  private snackBarRef: MatSnackBarRef<DeleteUserSnackbarComponent>) {
  }

  undo(): void {
    this.snackBarRef.dismissWithAction();
  }
}
