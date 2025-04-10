// cart-preview.component.ts
import { CommonModule } from "@angular/common";
import { Component, signal, inject } from "@angular/core";
import { CartService } from "./dashboard/services/cart.service";
import { RouterModule } from "@angular/router";
import { ProductsService } from "./dashboard/services/products.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-cart-preview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cart-toggle" (click)="toggle()">
      🛒 <span *ngIf="cartItems().length">{{ cartItems().length }}</span>
    </div>

    <div *ngIf="open()" class="cart-preview">
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
    .cart-toggle {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #000;
      color: white;
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 10000;
    }
    .cart-preview {
      position: fixed;
      top: 70px;
      right: 20px;
      width: 300px;
      max-height: 80vh;
      overflow-y: auto;
      background: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      padding: 10px;
      z-index: 9999;
    }
    .cart-item {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    img {
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
export class CartPreviewComponent {
  private cartService = inject(CartService);
  private productServ = inject(ProductsService);
  private toastr = inject(ToastrService)
  cartItems = this.cartService.getItems();
  open = signal(false);

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

  goToCheckout() {
    // Podés hacer un router.navigate o abrir un modal
  }

  async pagarTodoElCarrito() {
    try {
      const cartItems = this.cartItems();
      if (cartItems.length === 0) {
        this.toastr.warning('El carrito está vacío');
        return;
      }
  
      // Obtener datos del usuario
      const userData = localStorage.getItem('st_1892@121');
      if (!userData) {
        this.toastr.error('Usuario no identificado');
        return;
      }
  
      // Preparar payload
      const payload = {
        user: JSON.parse(userData), // Asumiendo que guardas un objeto JSON
        orderItems: cartItems.map(item => ({
          _id: item.product._id, // Cambiado de 'product' a '_id' para coincidir con tu backend
          quantity: item.quantity,
          price: item.price
        })),
        paymentMethod: 'credit_card', // Más específico que 'ePayco'
        totalAmount: this.total()
      };
  
      // Crear orden de pago
      this.productServ.createPaymentOrder(payload).subscribe({
        next: (res: any) => {
          // Verificar que la respuesta tenga los datos necesarios
          if (!res || !res.invoice) {
            throw new Error('Respuesta del servidor incompleta');
          }
  
          // Configurar ePayco
          const handler = (window as any).ePayco.checkout.configure({
            key: 'ae23dca89bab1bd8a75d3e66cbac05be', // Reemplaza con tu llave pública
            test: true // Cambiar a false en producción
          });
  
          // Datos para el checkout
          const checkoutData = {
            name: res.name || 'Compra en tu tienda',
            description: res.description || 'Pago de productos',
            invoice: res.invoice,
            currency: res.currency || 'COP',
            amount: res.amount,
            tax_base: res.amount, // Importante para Colombia
            tax: '0',
            country: res.country || 'CO',
            lang: 'es',
            external: 'true', // Usar checkout externo para evitar problemas
            response: res.response || `${window.location.origin}/payment-response`,
            confirmation: res.confirmation || `${window.location.origin}/payment-confirmation`,
            
            // Datos adicionales recomendados
            name_billing: payload.user.name || 'Cliente',
            email_billing: payload.user.email || 'cliente@example.com',
            address_billing: payload.user.address || 'Calle falsa 123',
            phone_billing: payload.user.phone || '3000000000'
          };
  
          // Abrir checkout
          handler.open(checkoutData);
        },
        error: (err) => {
          console.error('Error en el pago:', err);
          this.toastr.error(err.error?.message || 'Error al procesar el pago');
        }
      });
    } catch (error) {
      console.error('Error inesperado:', error);
      this.toastr.error('Ocurrió un error inesperado');
    }
  }
}

