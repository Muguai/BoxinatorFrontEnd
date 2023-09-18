import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditBoxPopupComponent } from '../edit-box-popup/edit-box-popup.component';
import { BoxServiceService } from 'src/app/services/box-service/box-service.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ReadBoxDTO, mockBox } from 'src/app/models/DTOs/Box/readBoxDTO';

@Component({
  selector: 'app-admin-boxes',
  templateUrl: './admin-boxes.component.html',
  styleUrls: ['./admin-boxes.component.scss']
})
export class AdminBoxesComponent implements OnInit {
  // controls which columns to render and in what order
  displayedColumns = ['box', 'description', 'content', 'price', 'edit'];
  boxes: ReadBoxDTO[] = [mockBox];

  constructor(private dialog: MatDialog, private readonly authService: AuthenticationService, 
    private readonly boxService: BoxServiceService) {}

  ngOnInit(): void {
    this.fetchBoxes();
  }

  async fetchBoxes(): Promise<void> {
    const token = await this.authService.getToken();
    this.boxService.getBoxData(token).subscribe({
      next: (res: ReadBoxDTO[]) => {
        this.boxes = res;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  openEdit(box: ReadBoxDTO): void {
    this.dialog.open(EditBoxPopupComponent, {
      width: '600px',
      data: box,
      autoFocus: false
    });
  }
}
