import { Component } from '@angular/core';
import { AdminLink } from 'src/app/models/adminLink';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent {
  public links: AdminLink[] = [
    {title: 'Orders', link: '/admin/orders', icon: 'local_shipping'},
    {title: 'Boxes', link: '/admin/boxes', icon: 'inventory'},
    {title: 'Users', link: '/admin/users', icon: 'people_alt'},
    {title: 'Countries', link: '/admin/countries', icon: 'place'}
  ];
}
