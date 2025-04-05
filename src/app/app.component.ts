import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./static-components/header/header.component";
import { ButtonModule } from 'primeng/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MyComponent } from "../../spinner.component";


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ButtonModule, RouterOutlet, MatMenuModule, MatButtonModule, RouterLink, MatIconModule, MyComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private router = inject(Router)
 
  urls = {
    brands: ['Adidas', 'Nike', 'Dolce & Gabbana', 'Reebok', 'Under Armour', 'Iecog Sports', 'Diesel'],
  };

  // Función para convertir nombres de marca a formato URL
  formatBrandForUrl(brand: string): string {
    return brand
                .replace(/\s+/g, '')   
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
  }


}
