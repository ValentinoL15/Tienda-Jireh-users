import { Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { SpecificProductComponent } from './dashboard/products/specific-product/specific-product.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  {
    path: 'dashboard', loadComponent:() => import('./dashboard/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'products/:brand/:gender', loadComponent:() => import('./dashboard/products/products.component').then((m) => m.ProductsComponent)
  },
  {
    path: 'products/:brand/:gender/:id', loadComponent:() => import('./dashboard/products/specific-product/specific-product.component').then((m) => m.SpecificProductComponent)
  },
  {
    path: 'register', loadComponent:() => import('./auth/register/register.component').then((m) => m.RegisterComponent)
  },
  {
    path: 'profile', loadComponent:() => import('./auth/profile/profile.component').then((m) => m.ProfileComponent)
  },
  {
    path: 'payment-response', loadComponent:() => import('./payments/payment-response/payment-response.component').then((m) => m.PaymentResponseComponent)
  },
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
 
];
