import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./static-components/header/header.component";
import { ButtonModule } from 'primeng/button';
import { MyComponent } from "./spinner.component";
import { AuthService } from './auth/services/auth.service';
import { CartPreviewComponent } from "./cart-preview.component";
import { CommonModule } from '@angular/common';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ButtonModule, RouterOutlet, MyComponent, CartPreviewComponent, CommonModule, Menubar,RouterLink],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private router = inject(Router)
  private authService = inject(AuthService)
  token: any = null

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Categorias',
        icon: 'pi pi-list',
        items: [
          {
            label: 'Hombres',
          },
          {
            label: 'Mujeres',
          },
          {
            label: 'Niñas',
          },
          {
            label: 'Niños',
          },
          {
            label: 'Unisex',
          },
        ]
      },
      {
        label: 'Home',
        icon: 'pi pi-home',
        route: '/dashboard'
      },
      {
        label: 'Productos',
        icon: 'pi pi-box',
        route: '/products'
      },
      {
        label: 'Más Populares',
        icon: 'pi pi-circle-on',
        route: ''
      },
      {
        label: 'Más Vendidos',
        icon: 'pi pi-star',
        route: ''
      },
      {
        label: 'Contacto',
        icon: 'pi pi-envelope'
      }
    ]
  }

  /* this.items = [
     {
         label: 'Hombre',
         icon: 'pi pi-box',
         items: [
             [
                 {
                     label: 'Adidas',
                     items: [
                         { label: 'SuperStar', route: '/register'},
                         { label: 'Street' },
                         { label: 'Tenis' },
                         { label: 'Adizero' },
                     ],
                 },
             ],
             [
               {
                 label: "Nike",
                 items: [
                   { label: 'Air Force' },
                   { label: 'Street' },
                   { label: 'Outdoor' },
                   { label: 'Predator' },
                 ]
               }
             ],
             [
               {
                 label: "Nike",
                 items: [
                   { label: 'Air Force' },
                   { label: 'Street' },
                   { label: 'Outdoor' },
                   { label: 'Predator' },
                 ]
               }
             ]
         ],
     },
     {
         label: 'Mujer',
         icon: 'pi pi-mobile',
         items: [
             [
                 {
                     label: 'Computer',
                     items: [
                         { label: 'Monitor' },
                         { label: 'Mouse' },
                         { label: 'Notebook' },
                         { label: 'Keyboard' },
                         { label: 'Printer' },
                         { label: 'Storage' },
                     ],
                 },
             ],
             [
                 {
                     label: 'Home Theater',
                     items: [{ label: 'Projector' }, { label: 'Speakers' }, { label: 'TVs' }],
                 },
             ],
             [
                 {
                     label: 'Gaming',
                     items: [{ label: 'Accessories' }, { label: 'Console' }, { label: 'PC' }, { label: 'Video Games' }],
                 },
             ],
             [
                 {
                     label: 'Appliances',
                     items: [
                         { label: 'Coffee Machine' },
                         { label: 'Fridge' },
                         { label: 'Oven' },
                         { label: 'Vaccum Cleaner' },
                         { label: 'Washing Machine' },
                     ],
                 },
             ],
         ],
     },
     {
         label: 'Niños',
         icon: 'pi pi-clock',
         items: [
             [
                 {
                     label: 'Football',
                     items: [{ label: 'Kits' }, { label: 'Shoes' }, { label: 'Shorts' }, { label: 'Training' }],
                 },
             ],
             [
                 {
                     label: 'Running',
                     items: [{ label: 'Accessories' }, { label: 'Shoes' }, { label: 'T-Shirts' }, { label: 'Shorts' }],
                 },
             ],
             [
                 {
                     label: 'Swimming',
                     items: [{ label: 'Kickboard' }, { label: 'Nose Clip' }, { label: 'Swimsuits' }, { label: 'Paddles' }],
                 },
             ],
             [
                 {
                     label: 'Tennis',
                     items: [{ label: 'Balls' }, { label: 'Rackets' }, { label: 'Shoes' }, { label: 'Training' }],
                 },
             ],
         ],
     },
 ];*/

  /*formatBrandForUrl(brand: string): string {
  return brand
              .replace(/\s+/g, '')   
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
}*/
  /*getToken(){
    this.token = this.authService.getToken()
  }*/

}
