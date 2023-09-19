import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteUserSnackbarComponent } from '../delete-user-snackbar/delete-user-snackbar.component';
import { DeleteRestoreUserService } from 'src/app/services/deleteRestoreUser/delete-restore-user.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-delete-user-popup',
  templateUrl: './delete-user-popup.component.html',
  styleUrls: ['./delete-user-popup.component.scss']
})
export class DeleteUserPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private snackBar: MatSnackBar, private readonly deleteRestoreService: DeleteRestoreUserService,
  private readonly authService: AuthenticationService, private readonly userService: UserService) {}

  async deleteUser(user: any): Promise<void> {
    const token = await this.authService.getToken();
    this.userService.deleteUser(token, user.id).subscribe({
      next: () => {
        // trigger reload of table over users
        this.deleteRestoreService.reloadUsers.emit();
      },
      error: err => {
        console.error(err);
      }
    });

    const snackBarRef = this.snackBar.openFromComponent(DeleteUserSnackbarComponent, {
      duration: 10000,
      data: user.name
    });

    snackBarRef.onAction().subscribe(async () => {
      const token = await this.authService.getToken();
      this.userService.restoreUser(token, user.id).subscribe({
        next: () => {
          // trigger reload of table over users
          this.deleteRestoreService.reloadUsers.emit();
        },
        error: err => {
          console.error(err);
        }
      });
    });
  }
}
