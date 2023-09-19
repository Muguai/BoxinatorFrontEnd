import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserPopupComponent } from '../delete-user-popup/delete-user-popup.component';
import { DeleteRestoreUserService } from 'src/app/services/deleteRestoreUser/delete-restore-user.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { ReadUserDTO, mockUser } from 'src/app/models/DTOs/User/readUserDTO';
import { UpdateUserDTO } from 'src/app/models/DTOs/User/updateUserDTO';
import { UserType } from 'src/app/models/userType';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
    // controls which columns to render and in what order
  displayedColumns: string[] = ['name', 'mail', 'activate', 'admin', 'delete'];
  users: ReadUserDTO[] = [mockUser];

  constructor(private dialog: MatDialog, private readonly deleteRestoreService: DeleteRestoreUserService,
    private readonly authService: AuthenticationService, private readonly userService: UserService) {}

  ngOnInit(): void {
    this.deleteRestoreService.reloadUsers.subscribe(() => {
      this.fetchUsers();
    });
    this.fetchUsers();
  }

  async fetchUsers(): Promise<void> {
    const token = await this.authService.getToken();
    this.userService.getUsers(token).subscribe({
      next: (res: ReadUserDTO[]) => {
        this.users = res;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  toggleActiveState(user: ReadUserDTO) {
    if (user.isActive === 'true') {
      user.isActive = 'false';
    } else if (user.isActive === 'false') {
      user.isActive = 'true';
    }

    this.updateUser(user);
  }

  showDeletePopup(user: any): void {
    this.dialog.open(DeleteUserPopupComponent, {
      data: {user: user}
    });
  }

  toggleAdmin(user: ReadUserDTO): void {
    if (user.userType === UserType.Admin) {
      user.userType = UserType.User;
    } else if (user.userType === UserType.User) {
      user.userType = UserType.Admin;
    }

    this.updateUser(user);
  }

  private async updateUser(user: ReadUserDTO): Promise<void> {
    const userCopy: ReadUserDTO = {...user};
    // convert from ReadUserDTO to UpdateUserDTO
    const uDTO = ((rDTO: ReadUserDTO) => {
      delete (rDTO as any).shipment;
      return rDTO as UpdateUserDTO;
    })(userCopy);

    const token = await this.authService.getToken();
    this.userService.putUser(token, user.id, uDTO).subscribe({
      error: err => {
        console.error(err);
      }
    });
  }
}
