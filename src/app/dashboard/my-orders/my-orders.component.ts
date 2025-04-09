import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@app/interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-my-orders',
  imports: [TableModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyOrdersComponent implements OnInit{
  private authService = inject(AuthService)
  private toastr = inject(ToastrService)
  private cd = inject(ChangeDetectorRef)
  user: User = {
      _id: "",
      name: "",
      gender: "",
      lastName: "",
      address: "",
      numberAddress: 0,
      phone: "",
      city: "",
      email: "",
      password: "",
      bought: 0,
      discount: false,
      discount_percentage: 0,
      orders: [{
        _id: "",
        user: "",
        orderItems: [{
            product: {
              _id: "",
            shoe_id: "",
            size: 0,
            stock: 0,
            color: "",
            sales: 0,
            image: "",
            },
            quantity: 0,
            price: 0
          }],
          paymentMethod: "",
          totalAmount: 0,
          isPaid: false,
          paidAt: new Date(),
          status: "",
          transactionId: ""
      }]
    }

  ngOnInit(): void {
    this.getMyUser()
  }

  getMyUser(){
    this.authService.getUser().subscribe({
      next: (res:any) => {
        this.user = res.user  
        this.cd.markForCheck()
        console.log(this.user)
      },
      error: (err:any) => {
        const msg = err?.message || 'Ocurrió un error inesperado';
        this.toastr.error(msg, 'Error');
      }
    })
  }
}
