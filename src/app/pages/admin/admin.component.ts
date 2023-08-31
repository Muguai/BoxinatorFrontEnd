import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  public links: Link[] = [];

  ngOnInit(): void {
    this.links = [
      {title: 'Orders', link: '/admin/orders'},
      {title: 'Boxes', link: '/admin/boxes'},
      {title: 'Users', link: '/admin/users'},
      {title: 'Countries', link: '/admin/countries'}
    ]
  }
}
