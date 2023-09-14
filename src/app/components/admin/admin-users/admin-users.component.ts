import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminUser } from 'src/app/models/adminUser';
import { DeleteUserPopupComponent } from '../delete-user-popup/delete-user-popup.component';
import { DeleteRestoreUserService } from 'src/app/services/deleteRestoreUser/delete-restore-user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
    // controls which columns to render and in what order
  displayedColumns: string[] = ['name', 'mail', 'action', 'delete'];
  users: AdminUser[] = [
    {id: 1, name: 'John Doe', mail: 'john.doe@mail.com', active: true},
    {id: 2, name: 'Jane Doe', mail: 'jane.doe@mail.com', active: false}
  ];

  constructor(private dialog: MatDialog, private readonly deleteRestoreService: DeleteRestoreUserService) {}

  ngOnInit(): void {
    this.deleteRestoreService.reloadUsers.subscribe(() => {
      // API CALL TO GET USERS
    });
  }

  toggleActiveState(user: AdminUser): void {
    user.active = !user.active;
    // PUT REQUEST HERE
  }

  showDeletePopup(user: any): void {
    this.dialog.open(DeleteUserPopupComponent, {
      data: {user: user}
    });
  }
}
