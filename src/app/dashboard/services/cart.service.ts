import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Product, SpecificShoe } from '@app/interfaces/interfaces';

export interface CartItem {
  product: SpecificShoe;
  selectedSize: number;
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
    // Buscar un ítem existente por product._id Y selectedSize
    const existing = items.find(i =>
      i.product._id === item.product._id && i.selectedSize === item.selectedSize
    );
  
    if (existing) {
      // Si existe, aplicar la restricción de máximo 2 unidades
      if (existing.quantity + item.quantity > 2) {
        existing.quantity = 2; // Máximo 2 unidades para este talle
      } else {
        existing.quantity += item.quantity;
      }
    } else {
      // Si no existe, agregar como nuevo ítem (respetando el límite de 2)
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

  updateItem(index: number, updatedItem: CartItem) {
    const items = [...this.cartItems()];
    if (index >= 0 && index < items.length) {
      items[index] = updatedItem;
      this.cartItems.set(items);
      this.save();
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