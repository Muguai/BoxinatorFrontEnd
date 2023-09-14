import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteUserSnackbarComponent } from '../delete-user-snackbar/delete-user-snackbar.component';
import { DeleteRestoreUserService } from 'src/app/services/deleteRestoreUser/delete-restore-user.service';

@Component({
  selector: 'app-delete-user-popup',
  templateUrl: './delete-user-popup.component.html',
  styleUrls: ['./delete-user-popup.component.scss']
})
export class DeleteUserPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private snackBar: MatSnackBar, private readonly deleteRestoreService: DeleteRestoreUserService) {}

  deleteUser(user: any): void {
    // DELETE REQUEST - id in data property

    // trigger reload of table over users
    this.deleteRestoreService.reloadUsers.emit();

    const snackBarRef = this.snackBar.openFromComponent(DeleteUserSnackbarComponent, {
      duration: 5000,
      data: user.name
    });

    snackBarRef.onAction().subscribe(() => {
      // RESTORE REQUEST - id in data property

      // trigger reload of table over users
      this.deleteRestoreService.reloadUsers.emit();
    });
  }
}
