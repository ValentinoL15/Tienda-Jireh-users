import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./static-components/header/header.component";
import { ButtonModule } from 'primeng/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MyComponent } from "./spinner.component";
import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ButtonModule, RouterOutlet, MatMenuModule, MatButtonModule, RouterLink, MatIconModule, MyComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  private router = inject(Router)
  private authService = inject(AuthService)
  token: any = null

  urls = {
    brands: ['Adidas', 'Nike', 'Dolce & Gabbana', 'Reebok', 'Under Armour', 'Iecog Sports', 'Diesel'],
  };

  formatBrandForUrl(brand: string): string {
    return brand
                .replace(/\s+/g, '')   
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
  }

  ngOnInit(): void {
    
  }

  getToken(){
    this.token = this.authService.getToken()
    
  }

}
