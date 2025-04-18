import { CommonModule } from '@angular/common';
import { Component, signal, inject, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { loadStripe, Stripe, StripeEmbeddedCheckout } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CartService } from '@app/dashboard/services/cart.service';
import { ProductsService } from '@app/dashboard/services/products.service';
import { AuthService } from '@app/auth/services/auth.service';
import { Router } from '@angular/router';

export const environment = {
  production: false,
  stripePublicKey: 'pk_test_51RFDmzPDNG2XzTXTipaO0cZTWdiWwggNp6gInXo5YaJyVAuqSuSRpCEil76LE7lJcJnLy5zx3Ui3TfhNelkBZAgO007mKeni5R' // Reemplaza con tu clave pública de Stripe
};

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="checkout-page">
      <h2>Finalizar Compra</h2>
      <div *ngIf="cartItems().length; else emptyCart">
        <div class="cart-summary">
          <h3>Resumen del Carrito</h3>
          <div *ngFor="let item of cartItems()" class="cart-item">
            <img [src]="item.product.image" alt="{{ item.parentProduct?.name }}" />
            <div>
              <strong>{{ item.parentProduct?.name || 'Producto' }}</strong>
              <p>Talla: {{ item.selectedSize }}</p>
              <p>Cantidad: {{ item.quantity }}</p>
              <p>Precio: {{ item.price | currency:'COP' }}</p>
            </div>
          </div>
          <strong>Total: {{ total() | currency:'COP' }}</strong>
        </div>

        <div *ngIf="loading()" class="loading">Cargando formulario de pago...</div>
        <div id="checkout-container" class="checkout-container"></div>

        <p-button
          label="Volver al Carrito"
          severity="secondary"
          (click)="goBack()"
          [disabled]="loading()"
        ></p-button>
      </div>

      <ng-template #emptyCart>
        <p>Tu carrito está vacío.</p>
        <p-button label="Volver al Carrito" severity="secondary" (click)="goBack()"></p-button>
      </ng-template>
    </div>
  `,
  styles: [`
    .checkout-page {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }

    .cart-summary {
      margin-bottom: 20px;
      border: 1px solid #eee;
      padding: 15px;
      border-radius: 8px;
    }

    .cart-item {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;
      border-bottom: 1px solid #eee;
      padding-bottom: 15px;
    }

    .cart-item img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
    }

    .cart-item div {
      flex: 1;
    }

    .checkout-container {
      margin-top: 20px;
      max-width: 100%;
      min-height: 400px;
    }

    .loading {
      text-align: center;
      margin: 20px 0;
      font-size: 1.2rem;
    }
  `]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private cartService = inject(CartService);
  private productServ = inject(ProductsService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  cartItems = this.cartService.getItems();
  loading = signal(false);
  private stripePromise: Promise<Stripe | null> = loadStripe(environment.stripePublicKey);
  private checkout: StripeEmbeddedCheckout | null = null;

  ngOnInit(): void {
    this.initiatePayment();
  }

  ngOnDestroy(): void {
    if (this.checkout) {
      this.checkout.destroy();
      this.checkout = null;
    }
    const container = document.querySelector('#checkout-container');
    if (container) {
      container.innerHTML = '';
    }
  }

  async initiatePayment() {
    if (!this.authService.getToken()) {
      this.toastr.error('Debes iniciar sesión para realizar el pago');
      this.goBack();
      return;
    }

    if (!this.cartItems().length) {
      this.toastr.error('El carrito está vacío');
      this.goBack();
      return;
    }

    this.loading.set(true);
    this.cdr.detectChanges();

    try {
      if (this.checkout) {
        this.checkout.destroy();
        this.checkout = null;
      }
      const container = document.querySelector('#checkout-container');
      if (container) {
        container.innerHTML = '';
      }

      const orderItems = this.cartItems().map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
        selectedSize: item.selectedSize
      }));

      const user = { id: this.authService.getToken() };

      const response = await firstValueFrom(
        this.productServ.createPaymentOrder({
          user,
          orderItems,
          paymentMethod: 'card',
          totalAmount: this.total()
        })
      );

      const { clientSecret } = response;

      const stripe = await this.stripePromise;
      if (!stripe) {
        throw new Error('No se pudo cargar Stripe.js');
      }

      const checkoutContainer = document.querySelector('#checkout-container');
      if (!checkoutContainer) {
        throw new Error('El contenedor #checkout-container no se encuentra en el DOM');
      }

      this.checkout = await stripe.initEmbeddedCheckout({
        clientSecret,
        onComplete: () => {
          this.handlePaymentSuccess();
        }
      });

      this.checkout.mount('#checkout-container');
      this.loading.set(false);
    } catch (error: any) {
      this.loading.set(false);
      this.toastr.error('Error al iniciar el pago: ' + (error.message || 'Desconocido'));
      console.error('Error initiating payment:', error);
      this.cdr.detectChanges();
    }
  }

  handlePaymentSuccess() {
    this.cartService.clearCart();
    this.toastr.success('Pago exitoso. Tu carrito ha sido vaciado.');
    this.router.navigate(['/dashboard']);
  }

  total() {
    return this.cartService.getTotal();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}