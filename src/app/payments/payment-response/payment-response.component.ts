import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-response',
  imports: [],
  templateUrl: './payment-response.component.html',
  styleUrl: './payment-response.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentResponseComponent implements OnInit{
  private route = inject(ActivatedRoute)
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const refPayco = params['ref_payco'];
      if (refPayco) {
        // Podés hacer una verificación contra ePayco
        console.log('Referencia de pago:', refPayco);
      }
    });
  }

}
