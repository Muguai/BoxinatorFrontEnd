import { Component } from '@angular/core';
import { AdminUser } from 'src/app/models/adminUser';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
    // controls which columns to render and in what order
  public displayedColumns: string[] = ['name', 'mail', 'action'];
  public users: AdminUser[] = [
    {id: 1, name: 'John Doe', mail: 'john.doe@mail.com', active: true},
    {id: 2, name: 'Jane Doe', mail: 'jane.doe@mail.com', active: false}
  ];

  public toggleActiveState(user: AdminUser): void {
    user.active = !user.active;
    // PUT REQUEST HERE
  }
}
