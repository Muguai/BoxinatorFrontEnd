import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ReadBoxDTO } from 'src/app/models/DTOs/Box/readBoxDTO';
import { BoxServiceService } from 'src/app/services/box-service/box-service.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-edit-box-popup',
  templateUrl: './edit-box-popup.component.html',
  styleUrls: ['./edit-box-popup.component.scss']
})
export class EditBoxPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ReadBoxDTO,
  private readonly authService: AuthenticationService,
  private readonly boxService: BoxServiceService) {}

  async onSubmit(form: NgForm): Promise<void> {
    this.data.boxName = form.value.boxName;
    this.data.content = form.value.content;
    this.data.description = form.value.description;
    this.data.dimensions = form.value.dimensions;
    this.data.price = form.value.price;
    this.data.imageUrl = form.value.imageUrl;
    this.data.weight = form.value.weight;

    const token = await this.authService.getToken();
    this.boxService.putBox(token, this.data.id, this.data).subscribe({
      error: err => {
        console.error(err);
      }
    });
  }
}
