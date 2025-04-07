import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../interfaces/interfaces';
import { MessageService } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specific-product',
  imports: [CarouselModule, ButtonModule, TagModule, CommonModule],
  standalone: true,
  templateUrl: './specific-product.component.html',
  styleUrl: './specific-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class SpecificProductComponent implements OnInit{

  //INJECTIONS
  private productServ = inject(ProductsService)
  private route = inject(ActivatedRoute)
  private messageServ = inject(MessageService)
  private cd = inject(ChangeDetectorRef)
  private router = inject(Router)

  //VARIABLES
  brand: string = '';
  gender: string = '';
  id: any;
  responsiveOptions: any[] | undefined;
  
  //INTERFACES
  product: Product = {
      _id: "",
      reference_id: "",
      name: "",
      gender: [],
      material: "",
      price: 0,
      original_price: 0,
      discount: false,
      discount_percentage: 0,
      type: [],
      brand: [],
      image: "",
      shoes: [{
        _id: "",
        shoe_id: "",
        size: 0,
        stock: 0,
        color: "",
        sales: 0,
        image: "",
      }]
  }

  volver(){
    this.router.navigate([`/products/${this.brand}/${this.gender}`])
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.brand = params['brand'];
      this.gender = params['gender'];
      this.id = params['id'];
    })
    this.getProduct();
    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '1199px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
      }
  ]
  }

  getProduct(){
    this.productServ.getProductById(this.id).subscribe({
      next: (res : any) => {
        this.product = res.product;
        this.cd.markForCheck(); // 👈 Esto actualiza el HTML
        console.log(this.product)
      },
      error: (err: any) => {
        this.messageServ.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Error desconocido' });
      }
    })
  }

}
