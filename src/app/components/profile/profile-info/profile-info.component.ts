import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfilePopupComponent } from '../edit-profile-popup/edit-profile-popup.component';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent {

  constructor(public authService: AuthenticationService, private dialog: MatDialog){}
  public openEdit(value: number): void {
    this.dialog.open(EditProfilePopupComponent, {
      width: '600px',
      data: {id: value},
      autoFocus: false
    });
  }
}
