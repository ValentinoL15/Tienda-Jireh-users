// cart-preview.component.ts
import { CommonModule } from "@angular/common";
import { Component, signal, inject, OnInit, effect } from "@angular/core";
import { CartService } from "./dashboard/services/cart.service";
import { RouterModule } from "@angular/router";
import { ProductsService } from "./dashboard/services/products.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "./auth/services/auth.service";

@Component({
  selector: 'app-cart-preview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  @if(this.token !== null && this.cartItems().length > 0) {
  <div class="cart-toggle" (click)="toggle()">
    🛒<span>{{ cartItems().length }}</span>
  </div>
}

<div *ngIf="open()" [ngClass]="{ 'cart-preview': true, 'open': open() }">
      <div *ngIf="cartItems().length; else emptyCart">
        <div *ngFor="let item of cartItems(); let i = index" class="cart-item">
          <img [src]="item.product.image" />
          <div>
            <strong>{{ item.parentProduct?.name || 'Producto' }}</strong>
            <p>Talla: {{ item.product.size }} | Color: {{ item.product.color }}</p>
            <p>Cantidad: {{ item.quantity }}</p>
            <p>{{ item.price | currency:'COP' }}</p>
            <button (click)="remove(i)">Eliminar</button>
          </div>
        </div>

        <div class="cart-actions">
          <strong>Total: {{ total() | currency:'COP' }}</strong>
          <button (click)="pagarTodoElCarrito()">Pagar</button>
          <button (click)="clear()">Vaciar carrito</button>
        </div>
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

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
  `]
})
export class CartPreviewComponent implements OnInit{
  private cartService = inject(CartService);
  private productServ = inject(ProductsService);
  private toastr = inject(ToastrService)
  private authService = inject(AuthService)
  cartItems = this.cartService.getItems();
  open = signal(false);
  token = signal<string | null>(null);
  previousLength = 0;

  constructor() {
    effect(() => {
      const items = this.cartItems();

      if (items.length > this.previousLength) {
        this.open.set(true);
      }

      if (items.length === 0) {
        this.open.set(false);
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
  }

  total() {
    return this.cartService.getTotal();
  }

  getToken(){
    this.token.set(this.authService.getToken());
  }
  
  ngOnInit(): void {
    this.getToken()
  }

  pagarTodoElCarrito() {
    const cartItems = this.cartItems();
    if (cartItems.length === 0) return;
  
    const payload = {
      user: localStorage.getItem('st_1892@121'), // o desde tu auth
      orderItems: cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price
      })),
      paymentMethod: 'ePayco', // o el método que manejes
      totalAmount: this.total()
    };

    const userId = localStorage.getItem('st_1892@121'); // adaptá según manejes el auth
    if (!userId) return alert('Usuario no identificado');
  
    this.productServ.createPaymentOrder(payload).subscribe({
      next: (res: any) => {
        const handler = (window as any).ePayco.checkout.configure({
          key: 'ae23dca89bab1bd8a75d3e66cbac05be',
          test: true
        });
  
        const data = {
          name: res.name,
          description: res.description,
          invoice: res.invoice,
          currency: res.currency,
          amount: res.amount,
          country: res.country,
          lang: 'es',
          external: 'true', 
          response: res.response,
          confirmation: res.confirmation
        };
  
        handler.open(data);
      },
      error: (err: any) => {
        console.error('Error creando orden de pago', err);
        this.toastr.error(err.error.message)
      }
    });
  }
}

