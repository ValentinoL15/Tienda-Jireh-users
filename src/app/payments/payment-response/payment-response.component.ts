import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@app/dashboard/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { MyComponent } from "../../spinner.component";
import { NgIf } from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    private paymentService: ProductsService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const refPayco = params['ref_payco'];
      
      if (!refPayco) {
        this.paymentStatus = 'No se recibió referencia de pago';
        this.loading = false;
        return;
      }
      console.log('Todos los query params:', params);
      this.verifyPayment(refPayco);
    });
  }

  verifyPayment(refPayco: string) {
    this.paymentService.verifyPayment(refPayco).subscribe({
      next: (response) => {
        console.log('Payment verification response:', response);
        this.loading = false;
        
        if (response.success) {
          switch (response.data.x_response) { 
            case 'Aceptada':
              this.paymentStatus = '¡Pago exitoso!';
              this.toastr.success('Tu pago ha sido procesado correctamente');
              break;
            case 'Pendiente':
              this.paymentStatus = 'Pago pendiente';
              this.toastr.warning('Tu pago está pendiente de confirmación');
              break;
            case 'Rechazada':
              this.paymentStatus = 'Pago rechazado';
              this.toastr.error('El pago fue rechazado');
              break;
            default:
              this.paymentStatus = 'Estado desconocido';
          }
        } else {
          this.paymentStatus = 'Error al verificar el pago';
          this.toastr.error(response.message);
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.paymentStatus = 'Error de conexión';
        this.toastr.error('No se pudo verificar el estado del pago');
        console.error('Error verifying payment:', err);
        this.cdr.markForCheck(); // 👈 También acá por si hay error
      }
    });
  }
}
