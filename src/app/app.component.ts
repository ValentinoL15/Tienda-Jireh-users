import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./static-components/header/header.component";
import { ButtonModule } from 'primeng/button';
import { MyComponent } from "./spinner.component";
import { AuthService } from './auth/services/auth.service';
import { CartPreviewComponent } from "./cart-preview.component";
import { CommonModule, ViewportScroller } from '@angular/common';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { filter } from 'rxjs';

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
  private viewportScroller = inject(ViewportScroller)
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
      label: 'Más Vendidos',
      icon: 'pi pi-star',
      routerLink: '/bestsellers',
    },
    {
      label: 'Ofertas',
      icon: 'pi pi-percentage',
      routerLink: '/dashboard',
      fragment: 'offers',
    },
    {
      label: 'Contacto',
      icon: 'pi pi-envelope',
      routerLink: '/contact', // Changed to route for consistency
    },
  ];

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Esperar un breve momento para asegurar que el contenido se haya renderizado
      setTimeout(() => {
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (fragment) {
          this.viewportScroller.scrollToAnchor(fragment);
        }
      }, 100); // Puedes ajustar el tiempo según sea necesario
    });
  }
  }


