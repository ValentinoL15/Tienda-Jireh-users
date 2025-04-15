import { Routes } from '@angular/router';
import { PaymentResponseComponent } from './payments/payment-response/payment-response.component';

export const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./dashboard/home/home.component').then(m => m.HomeComponent) },
  { path: 'products/:brand/:gender', loadComponent: () => import('./dashboard/products/products.component').then(m => m.ProductsComponent) },
  { path: 'products/:brand/:gender/:id', loadComponent: () => import('./dashboard/products/specific-product/specific-product.component').then(m => m.SpecificProductComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'profile', loadComponent: () => import('./auth/profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'payment-response', component: PaymentResponseComponent },
  { path: 'my-o rders', loadComponent: () => import('./dashboard/my-orders/my-orders.component').then((m) => m.MyOrdersComponent) },
  // Redirección por defecto
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Ruta comodín
  { path: '**', redirectTo: 'dashboard' }
];

