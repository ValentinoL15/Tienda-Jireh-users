import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Tag } from 'primeng/tag';
import { Product } from '../../interfaces/interfaces';
import { ProductsService } from '../services/products.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';


@Component({
  selector: 'app-home',
  imports: [Tag, ButtonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class HomeComponent implements OnInit{
  private cd = inject(ChangeDetectorRef)
  private productServ = inject(ProductsService)
  private messageServ = inject(MessageService)
  items: any[] | undefined;
  products!: Product[]
  totalRecords: number = 0;
  skip: number = 0;
  limit: number = 12;
  first: number = 0;

  ngOnInit(): void {
  this.getAllProducts()
  this.cd.detectChanges()
}

getAllProducts(skip: number = 0, limit: number = this.limit) {
  const queryParams: any = {
    skip: skip.toString(),
    limit: limit.toString()}
  this.productServ.getAllProducts(skip, limit).subscribe({
    next: (res: any) => {
      this.products = [...res.products]; // Clonar array para forzar detección de cambios
      this.totalRecords = res.total ?? 0;
      this.cd.detectChanges(); // Forzar actualización del DOM
    },
    error: (err: any) => {
      this.messageServ.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Error desconocido' });
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
