import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '@app/dashboard/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { MyComponent } from "../../spinner.component";
import { NgIf } from '@angular/common';
import { CartService } from '@app/dashboard/services/cart.service';

@Component({
  selector: 'app-payment-response',
  imports: [MyComponent, NgIf],
  templateUrl: './payment-response.component.html',
  styleUrl: './payment-response.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentResponseComponent implements OnInit {
  paymentStatus: string = 'Verificando...';
  loading = true;
  private router = inject(Router)
  private cartService = inject(CartService)

  constructor(
    private route: ActivatedRoute,
    private paymentService: ProductsService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const sessionId = params['session_id'];

      if (!sessionId) {
        this.paymentStatus = 'No se recibió el ID de la sesión de pago';
        this.loading = false;
        this.toastr.error('No se pudo verificar el pago');
        this.cdr.markForCheck();
        return;
      }

      console.log('Query params:', params);
      this.verifyPayment(sessionId);
    });
  }

  verifyPayment(sessionId: string) {
    this.paymentService.verifyStripePayment(sessionId).subscribe({
      next: (res : any) => {
        console.log('Stripe payment verification response:', res);
        this.loading = false;

        if (res.success) {
          switch (res.status) {
            case 'paid':
              this.paymentStatus = '¡Pago exitoso!';
              this.toastr.success('Tu pago ha sido procesado correctamente');
              this.cartService.clearCart(); // Limpiar el carrito
              // Redirigir a la página de éxito después de un breve retraso
              setTimeout(() => {
                this.router.navigate(['/success']);
              }, 2000);
              break;
            case 'pending':
              this.paymentStatus = 'Pago pendiente';
              this.toastr.warning('Tu pago está pendiente de confirmación');
              break;
            case 'failed':
              this.paymentStatus = 'Pago rechazado';
              this.toastr.error('El pago fue rechazado');
              // Redirigir a la página de cancelación si es necesario
              setTimeout(() => {
                this.router.navigate(['/cancel']);
              }, 2000);
              break;
            default:
              this.paymentStatus = 'Estado desconocido';
              this.toastr.error('Estado de pago no reconocido');
          }
        } else {
          this.paymentStatus = 'Error al verificar el pago';
          this.toastr.error(res.message || 'No se pudo verificar el pago');
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.paymentStatus = 'Error de conexión';
        this.toastr.error('No se pudo verificar el estado del pago');
        console.error('Error verifying Stripe payment:', err);
        this.cdr.markForCheck();
      }
    });
  }
}
