import { Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { SpecificProductComponent } from './dashboard/products/specific-product/specific-product.component';

export const routes: Routes = [
  {
    path: 'dashboard', component: HomeComponent
  },
  {
    path: 'products/:brand/:gender', component: ProductsComponent
  },
  {
    path: 'products/:brand/:gender/:id', component: SpecificProductComponent
  },
  {
    path: '', component: HomeComponent, pathMatch: 'full'
  },
 
];
