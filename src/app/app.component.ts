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

 items: MenuItem[] = [
    {
      label: 'Categorias',
      icon: 'pi pi-list',
      items: [
        {
          label: 'Hombres',
          items: [
            { label: 'Nike', routerLink: ['/products', 'Nike', 'Hombre'] },
            { label: 'Adidas', routerLink: ['/products', 'Adidas', 'Hombre'] },
            { label: 'Reebok', routerLink: ['/products', 'Reebok', 'Hombre'] },
            { label: 'Diesel', routerLink: ['/products', 'Diesel', 'Hombre'] },
            { label: 'Le Coq', routerLink: ['/products', 'LeCoqSport', 'Hombre'] },
            { label: 'Dolce & Gabbana', routerLink: ['/products', 'Dolce&Gabbana', 'Hombre'] }, // Fixed brand name
            { label: 'Under Armour', routerLink: ['/products', 'UnderArmour', 'Hombre'] },
          ],
        },
        {
          label: 'Mujeres',
          items: [
            { label: 'Nike', routerLink: ['/products', 'Nike', 'Mujer'] },
            { label: 'Adidas', routerLink: ['/products', 'Adidas', 'Mujer'] },
            { label: 'Reebok', routerLink: ['/products', 'Reebok', 'Mujer'] },
            { label: 'Diesel', routerLink: ['/products', 'Diesel', 'Mujer'] },
            { label: 'Le Coq', routerLink: ['/products', 'LeCoqSport', 'Mujer'] },
            { label: 'Dolce & Gabbana', routerLink: ['/products', 'Dolce&Gabbana', 'Mujer'] },
            { label: 'Under Armour', routerLink: ['/products', 'UnderArmour', 'Mujer'] },
          ],
        },
        {
          label: 'Niñas',
          items: [
            { label: 'Nike', routerLink: ['/products', 'Nike', 'Niña'] },
            { label: 'Adidas', routerLink: ['/products', 'Adidas', 'Niña'] },
            { label: 'Reebok', routerLink: ['/products', 'Reebok', 'Niña'] },
            { label: 'Diesel', routerLink: ['/products', 'Diesel', 'Niña'] },
            { label: 'Le Coq', routerLink: ['/products', 'LeCoqSport', 'Niña'] },
            { label: 'Dolce & Gabbana', routerLink: ['/products', 'Dolce&Gabbana', 'Niña'] },
            { label: 'Under Armour', routerLink: ['/products', 'UnderArmour', 'Niña'] },
          ],
        },
        {
          label: 'Niños',
          items: [
            { label: 'Nike', routerLink: ['/products', 'Nike', 'Niño'] },
            { label: 'Adidas', routerLink: ['/products', 'Adidas', 'Niño'] },
            { label: 'Reebok', routerLink: ['/products', 'Reebok', 'Niño'] },
            { label: 'Diesel', routerLink: ['/products', 'Diesel', 'Niño'] },
            { label: 'Le Coq', routerLink: ['/products', 'LeCoqSport', 'Niño'] },
            { label: 'Dolce & Gabbana', routerLink: ['/products', 'Dolce&Gabbana', 'Niño'] },
            { label: 'Under Armour', routerLink: ['/products', 'UnderArmour', 'Niño'] },
          ],
        },
        {
          label: 'Unisex',
          items: [
            { label: 'Nike', routerLink: ['/products', 'Nike', 'Unisex'] },
            { label: 'Adidas', routerLink: ['/products', 'Adidas', 'Unisex'] },
            { label: 'Reebok', routerLink: ['/products', 'Reebok', 'Unisex'] },
            { label: 'Diesel', routerLink: ['/products', 'Diesel', 'Unisex'] },
            { label: 'Le Coq', routerLink: ['/products', 'LeCoqSport', 'Unisex'] },
            { label: 'Dolce & Gabbana', routerLink: ['/products', 'Dolce&Gabbana', 'Unisex'] },
            { label: 'Under Armour', routerLink: ['/products', 'UnderArmour', 'Unisex'] },
          ],
        },
      ],
    },
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/dashboard',
    },
    {
      label: 'Productos',
      icon: 'pi pi-box',
      routerLink: '/products',
    },
    {
      label: 'Más Populares',
      icon: 'pi pi-circle-on',
      routerLink: '/popular',
    },
    {
      label: 'Más Vendidos',
      icon: 'pi pi-star',
      routerLink: '/bestsellers',
    },
    {
      label: 'Contacto',
      icon: 'pi pi-envelope',
      routerLink: '/contact', // Changed to route for consistency
    },
  ];

  ngOnInit(): void {
    
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
