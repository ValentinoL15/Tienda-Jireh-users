// cart-preview.component.ts
import { CommonModule } from '@angular/common';
import { Component, signal, inject, OnInit, effect, ChangeDetectorRef } from '@angular/core';
import { CartService } from './dashboard/services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from './dashboard/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';

export const environment = {
  production: false,
  stripePublicKey: 'pk_test_51RFDmzPDNG2XzTXTipaO0cZTWdiWwggNp6gInXo5YaJyVAuqSuSRpCEil76LE7lJcJnLy5zx3Ui3TfhNelkBZAgO007mKeni5R' // Reemplaza con tu clave pública de Stripe
};

@Component({
  selector: 'app-cart-preview',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  template: `
    @if (this.token !== null && this.cartItems().length > 0) {
      <div class="cart-toggle" (click)="toggle()">
        🛒<span>{{ cartItems().length }}</span>
      </div>
    }

    <div *ngIf="open()" [ngClass]="{ 'cart-preview': true, 'open': open() }">
      <p-button severity="contrast" size="small" [rounded]="true" class="closes-btn" (click)="toggle()">X</p-button>
      <div *ngIf="cartItems().length; else emptyCart">
        <div *ngFor="let item of cartItems(); let i = index" class="cart-item">
          <img [src]="item.product.image" />
          <div>
            <strong>{{ item.parentProduct?.name || 'Producto' }}</strong>
            <p>Talla: {{ item.selectedSize }}</p>
            <div class="quantity-control">
              <button (click)="decrementQuantity(i)" [disabled]="item.quantity <= 1">-</button>
              <p>Cantidad: {{ item.quantity }}</p>
              <button (click)="incrementQuantity(i)" [disabled]="item.quantity >= 2">+</button>
            </div>
            <p>{{ item.price | currency:'COP' }}</p>
            <button (click)="remove(i)">Eliminar</button>
          </div>
        </div>

        <div class="cart-actions">
          <strong>Total: {{ total() | currency:'COP' }}</strong>
          <p-button
  label="Pagar"
  severity="success"
  [loading]="loading()"
  (click)="pagar()"
  (touchend)="pagar()"
  [disabled]="loading() || cartItems().length === 0"
></p-button>
          <p-button label="Vaciar carrito" severity="danger" (click)="clear()"></p-button>
        </div>

        <!-- Contenedor para el formulario embebido de Stripe -->
        <div id="checkout-container" *ngIf="showCheckout()" class="checkout-container"></div>
      </div>

      <ng-template #emptyCart>
        <p>Tu carrito está vacío.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      z-index: 9998;
    }

    .quantity-control {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 5px 0;
    }

    .quantity-control button {
      background: #007bff;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .quantity-control button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .quantity-control p {
      margin: 0;
      font-size: 1rem;
    }

    .closes-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: transparent;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 10001;
    }

    .closes-btn:hover {
      color: #ff0000;
    }

    .cart-toggle {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: #000;
      color: white;
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 10000;
    }

    .cart-preview {
      position: fixed;
      top: 0;
      right: 0;
      height: 100%;
      width: 320px;
      background: white;
      border-left: 1px solid #ccc;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      transition: transform 0.3s ease-in-out;
      transform: translateX(100%);
      padding: 20px;
      overflow-y: auto;
    }

    .cart-preview.open {
      transform: translateX(0);
    }

    .cart-item {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }

    .cart-item img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 8px;
    }

    .cart-actions {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .checkout-container {
      margin-top: 20px;
      max-width: 100%;
      min-height: 400px;
    }
  `]
})
export class CartPreviewComponent implements OnInit {
  private cartService = inject(CartService);
  private productServ = inject(ProductsService);
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router)
  cartItems = this.cartService.getItems();
  open = signal(false);
  token = signal<string | null>(null);
  loading = signal(false);
  showCheckout = signal(false);
  previousLength = 0;
  private stripePromise: Promise<Stripe | null> = loadStripe(environment.stripePublicKey);

  constructor() {
    effect(() => {
      const items = this.cartItems();

      if (items.length > this.previousLength) {
        this.open.set(true);
      }

      if (items.length === 0) {
        this.open.set(false);
        this.showCheckout.set(false);
      }

      this.previousLength = items.length;
    });
  }

  toggle() {
    this.open.set(!this.open());
  }

  remove(index: number) {
    this.cartService.removeItem(index);
  }

  clear() {
    this.cartService.clearCart();
    this.open.set(false);
    this.showCheckout.set(false);
  }

  incrementQuantity(index: number) {
    const items = [...this.cartItems()];
    const item = items[index];

    if (item.quantity < 2) {
      item.quantity += 1;
      this.cartService.updateItem(index, item);
      this.toastr.success('Cantidad actualizada');
    } else {
      this.toastr.warning('No puedes agregar más de 2 unidades de este talle.');
    }
  }

  decrementQuantity(index: number) {
    const items = [...this.cartItems()];
    const item = items[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
      this.cartService.updateItem(index, item);
      this.toastr.success('Cantidad actualizada');
    } else {
      this.toastr.warning('La cantidad mínima es 1. Usa "Eliminar" para quitar el producto.');
    }
  }

  total() {
    return this.cartService.getTotal();
  }

  getToken() {
    this.token.set(this.authService.getToken());
  }

  ngOnInit(): void {
    this.getToken();
  }

  pagar() {
    if (!this.token()) {
      this.toastr.error('Debes iniciar sesión para realizar el pago');
      return;
    }

    if (!this.cartItems().length) {
      this.toastr.error('El carrito está vacío');
      return;
    }

    this.router.navigate(['/checkout']);
  }
}