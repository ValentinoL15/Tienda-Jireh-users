import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../interfaces/interfaces';
import { MessageService } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-specific-product',
  imports: [CarouselModule, ButtonModule, TagModule, CommonModule,ReactiveFormsModule,FormsModule],
  standalone: true,
  templateUrl: './specific-product.component.html',
  styleUrl: './specific-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecificProductComponent implements OnInit{

  //INJECTIONS
  private productServ = inject(ProductsService)
  private authService = inject(AuthService)
  private route = inject(ActivatedRoute)
  private cd = inject(ChangeDetectorRef)
  private router = inject(Router)
  private toastr = inject(ToastrService)

  //VARIABLES
  brand: string = '';
  gender: string = '';
  id: any;
  responsiveOptions: any[] | undefined;
  ePayco: any;
  token: any = null
  
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
      this.getProduct();
    })
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
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const existingScript = document.querySelector('script[src="https://checkout.epayco.co/checkout.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://checkout.epayco.co/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('✅ Script de ePayco cargado correctamente');
      };
      script.onerror = () => {
        console.error('❌ No se pudo cargar el script de ePayco');
      };
      document.body.appendChild(script);
    }
  }
  }

  getProduct(){
    this.productServ.getProductById(this.id).subscribe({
      next: (res : any) => {
        console.log('✅ Producto recibido:', res);
        this.product = res.product;
        this.cd.markForCheck(); 
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
        console.log(err)
      }
    })
  }

  openEpaycoCheckout(): void {
    const handler = (window as any).ePayco.checkout.configure({
      key: 'ae23dca89bab1bd8a75d3e66cbac05be',
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
      external: false,
      response: 'https://tienda-jireh-users.vercel.app/payment-response',
      confirmation: 'https://tienda-jireh-service-production.up.railway.app/webhook'
    };
  
    handler.open(data);
  }

/****************************************************CARRITO*************************************/

productoSeleccionado: any = null;
carritoAbierto = false;
cantidad = 1;

agregarAlCarrito(shoe: any) {
  const token = this.authService.getToken()
  if (!token) {
    this.toastr.error('Para comprar debes iniciar sesión o crearte una cuenta!')
    return
  }
  this.productoSeleccionado = shoe;
  this.cantidad = 1;
  this.carritoAbierto = true;
}

cerrarCarrito() {
  this.carritoAbierto = false;
  this.productoSeleccionado = null;
}

get cartItems() {
  if (!this.productoSeleccionado) return [];
  console.log(this.productoSeleccionado)
  return [{
    _id: this.product._id,
    name: this.product.name,
    quantity: this.cantidad,
    image: this.productoSeleccionado.image,
    price: this.product.price,
    size: this.productoSeleccionado.size,
    color: this.productoSeleccionado.color,
    shoeId: this.productoSeleccionado.shoe_id
  }];
}

getTotal(): number {
  return this.cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

pagarAhora() {
  if (!(window as any).ePayco) {
    this.toastr.error('ePayco no se ha cargado correctamente. Intentá de nuevo.');
    return;
  }

  const payload = {
    user: '67eea38555dc88f17442759b',
    orderItems: {
      product: this.productoSeleccionado._id,
      quantity: this.cantidad,
      price: this.getTotal()
    },
    paymentMethod: 'epayco',
    totalAmount: this.getTotal()
  };

  this.productServ.createPaymentOrder(this.id, payload).subscribe({
    next: (res: any) => {
      const handler = (window as any).ePayco.checkout.configure({
        key: 'ae23dca89bab1bd8a75d3e66cbac05be',
        test: true
      });

      const data = {
        name: res.name,
        description: res.description,
        invoice: res.invoice,
        currency: res.currency,
        amount: res.amount,
        country: res.country,
        lang: 'es',
        external: true,
        response: res.response,
        confirmation: res.confirmation
      };

      handler.open(data);
    },
    error: (err: any) => {
      console.error('Error creando pago', err);
    }
  });
}


}
