import { Component, Input } from '@angular/core';
import { Box } from 'src/app/models/mysteryBox';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss']
})
export class SummaryItemComponent {
  @Input() box!: Box;
}
