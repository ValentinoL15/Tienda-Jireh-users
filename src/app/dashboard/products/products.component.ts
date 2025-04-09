import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../../interfaces/interfaces';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [RouterLink,ButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class ProductsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productServ = inject(ProductsService);
  private messageServ = inject(MessageService)
  private cd = inject(ChangeDetectorRef); 
  private router = inject(Router)
  
  brand: string = '';
  gender: string = '';
  products: Product[]  = [];

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        this.brand = params['brand'];
        this.gender = params['gender'];
        return this.productServ.getProductsByGender(this.brand, this.gender);
      })
    ).subscribe({
      next: (res: any) => {
        this.products = res.shoes;
        this.cd.markForCheck(); // 👈 Esto actualiza el HTML
      },
      error: (err) => {
        this.messageServ.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Error desconocido'
        });
      }
    });
  }

  getProductsGender(){
    this.productServ.getProductsByGender(this.brand, this.gender).subscribe({
      next: (res : any) => {
        this.products = res.shoes;
      },
      error: (err) => {
        this.messageServ.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Error desconocido' });
      }
    })
  }

  volver(){
    this.router.navigate(['/dashboard'])
  }
}
