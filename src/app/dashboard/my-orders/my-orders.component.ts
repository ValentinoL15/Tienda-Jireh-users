import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@app/interfaces/interfaces';
import { SpinnerService } from '@app/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { Image } from 'primeng/image';

@Component({
  selector: 'app-my-orders',
  imports: [TableModule,Image],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyOrdersComponent implements OnInit{
  private authService = inject(AuthService)
  private spinner = inject(SpinnerService)
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
        reference_id: "",
        user: "",
        orderItems: [{
          product: {
            _id: "",
            shoe_id: "",
            talle_34: 0,
  talle_35: 0,
  talle_36: 0,
  talle_37: 0,
  talle_38: 0,
  talle_39: 0,
  talle_40: 0,
  talle_41: 0,
  talle_42: 0,
  talle_43: 0,
  talle_44: 0,
            sales: 0,
            image: "",
          },
          quantity: 0,
          price: 0,
          selectedSize: 0
        }],
        paymentMethod: "",
        totalAmount: 0,
        isPaid: false,
        paidAt: new Date(),
        status: "", 
        transactionId: ""
      }]
  }
  isLoaded = false;

  ngOnInit(): void {
    this.spinner.show();
    this.getMyUser()
  }

  getMyUser(){
    this.authService.getUser().subscribe({
      next: (res:any) => {
        this.user = res.user 
        console.log(this.user)
        this.isLoaded = true;
        this.spinner.hide(); 
        this.cd.markForCheck()
      },
      error: (err:any) => {
        const msg = err?.message || 'Ocurrió un error inesperado';
        this.toastr.error(msg, 'Error');
        this.spinner.hide();
      }
    })
  }
}
