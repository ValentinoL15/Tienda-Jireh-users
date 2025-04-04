import { Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { ProductsComponent } from './dashboard/products/products.component';

export const routes: Routes = [
  {
    path: 'dashboard', component: HomeComponent
  },
  {
    path: 'products/:brand/:gender', component: ProductsComponent
  },
  {
    path: '', component: HomeComponent, pathMatch: 'full'
  },
];
