import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@app/dashboard/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ButtonModule,DropdownModule,FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit{
  private router = inject(Router)
  private productService = inject(ProductsService)
  private authService = inject(AuthService)
  private toastr = inject(ToastrService)
  private fb = inject(FormBuilder)

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^3\d{9}$/)]],
      city: ['', Validators.required],
      address: ['', Validators.required],
      numberAddress: ['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    })
  }

cities: any[] = [];
genders: any[] = [
  {
    gender: "Hombre"
  },
  {
    gender: "Mujer"
  }
]
selectedCity: any = null;
gender: any = null;
form: FormGroup


ngOnInit(): void {
  this.loadCities()
}

loadCities() {
  this.productService.getCities().subscribe({
    next: (data) => {
      this.cities = data;
    },
    error: (err) => {
      console.error('Error al cargar ciudades:', err);
      this.toastr.error("Error al cargar ciudades de Colombia")
    }
  });
}

volver(){
  this.router.navigate(['/dashboard'])
}

registro(){
  if(this.form.get('password')?.value !== this.form.get('confirm_password')?.value){
    this.toastr.error("Las contraseñas no coinciden")
  }

  let phoneValue = this.form.get('phone')?.value;
  if (!phoneValue.startsWith('+57')) {
    phoneValue = '+57' + phoneValue;
  }

  const formulario = {
    name: this.form.get('name')?.value,
    lastName: this.form.get('lastName')?.value,
    gender: this.form.get('gender')?.value?.gender || this.form.get('gender')?.value,
    phone: phoneValue,
    city: this.form.get('city')?.value?.name || this.form.get('city')?.value,
    address: this.form.get('address')?.value,
    numberAddress: this.form.get('numberAddress')?.value,
    email: this.form.get('email')?.value,
    password: this.form.get('password')?.value,
  }
  if (this.form.valid) {
    this.authService.register(formulario).subscribe({
      next: (res : any) => {
        this.toastr.success(res.message)
        this.router.navigate(['/dashboard'])
      },
      error: (err : any) => {
        console.error('Error al registrar usuario:', err);
        this.toastr.error(err.error.message)
      }
    })
  }
  
}


}
