import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-response',
  imports: [],
  templateUrl: './payment-response.component.html',
  styleUrl: './payment-response.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentResponseComponent implements OnInit{
  ePayco: any;
  
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://checkout.epayco.co/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }

  openEpaycoCheckout(): void {
    const handler = (window as any).ePayco.checkout.configure({
      key: 'TU_PUBLIC_KEY',
      test: true
    });
  
    const data = {
      name: 'Compra de zapatos',
      description: 'Pago en ecommerce',
      invoice: 'ID_ORDEN_GENERADA',
      currency: 'COP',
      amount: '10000',
      country: 'CO',
      lang: 'es',
      external: 'false',
      response: 'https://tienda-jireh-users.vercel.app/payment-response',
      confirmation: 'https://tienda-jireh-service-production.up.railway.app/api/orders/webhook'
    };
  
    handler.open(data);
  }
}
