import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Product, SpecificShoe } from '@app/interfaces/interfaces';

export interface CartItem {
  product: SpecificShoe;
  quantity: number;
  price: number;
  parentProduct?: Product; // para acceder al nombre, imagen, etc.
}


@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('cart');
      if (saved) this.cartItems.set(JSON.parse(saved));
    }
  }
  getItems() {
    return this.cartItems.asReadonly();
  }

  addItem(item: CartItem) {
    const items = [...this.cartItems()];
    const existing = items.find(i =>
      i.product._id === item.product._id 
    );
  
    if (existing) {
      if (existing.quantity + item.quantity > 2) {
        existing.quantity = 2; // lo dejamos en el máximo
      } else {
        existing.quantity += item.quantity;
      }
    } else {
      if (item.quantity > 2) item.quantity = 2;
      items.push(item);
    }
  
    this.cartItems.set(items);
    this.save();
  }
  

  removeItem(index: number) {
    const updated = [...this.cartItems()];
    updated.splice(index, 1);
    this.cartItems.set(updated);
    this.save();
  }

  clearCart() {
    this.cartItems.set([]);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('cart');
    }
  }

  getTotal() {
    return this.cartItems().reduce((total, item) => total + item.price * item.quantity, 0);
  }

  private save() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    }
  }
}