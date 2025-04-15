import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Product } from '../../interfaces/interfaces';
import { ProductsService } from '../services/products.service';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ToastrService } from 'ngx-toastr';
import { Carousel } from 'primeng/carousel';




@Component({
  selector: 'app-home',
  imports: [ButtonModule, PaginatorModule,RouterLink,Carousel],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit{
  private cd = inject(ChangeDetectorRef)
  private productServ = inject(ProductsService)
  private toastr = inject(ToastrService)
  items: any[] | undefined;
  products: Product[] = []
  totalRecords: number = 0;
  skip: number = 0;
  limit: number = 12;
  first: number = 0;
  
  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
  this.getAllProducts()
  this.responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
    },
];
  
  }

  get filteredProducts() {
    return this.products.filter(p => p.shoes);
  }

  

getAllProducts(skip: number = 0, limit: number = this.limit) {
  this.productServ.getAllProducts(skip, limit).subscribe({
    next: (res: any) => {
      this.products = [...res.products]; // Clonar array para forzar detección de cambios
      this.totalRecords = res.total ?? 0;
      this.cd.markForCheck(); // Forzar actualización del DOM
    },
    error: (err: any) => {
      console.error(err);
      this.toastr.error(err.error.message)
    }
  });
}

onPageChange(event: PaginatorState) {
  this.first = event.first ?? 0;
  this.limit = event.rows ?? 10;
  this.skip = this.first;
  this.getAllProducts(this.skip, this.limit);
}

}
