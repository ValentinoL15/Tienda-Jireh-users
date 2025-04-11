import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [InputTextModule,FormsModule,Dialog,ButtonModule,ReactiveFormsModule,OverlayPanelModule,RouterLink],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit{
  private authService = inject(AuthService)
  private fb = inject(FormBuilder)
  private toastr = inject(ToastrService)
  private cd = inject(ChangeDetectorRef)
  private router = inject(Router)
  private tokenSubscription: Subscription = Subscription.EMPTY;

  value3 : string = ''
  visible: boolean = false;
  form:FormGroup;
  token: string | null = null;
  authState: 'loading' | 'authenticated' | 'unauthenticated' = 'loading';

  constructor() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: () => this.router.navigate(['/dashboard'])
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => this.router.navigate(['/settings'])
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];
  
  logout() {
    try {
      this.authService.logOut();
      this.token = null
      this.cd.markForCheck(); // Forzar detección de cam
      this.toastr.success("Sesión cerrada con éxito")
    } catch (error) {
      this.toastr.error("Ocurrió un error inesperado")
    }
  
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.authState = this.token ? 'authenticated' : 'unauthenticated';

    this.tokenSubscription = this.authService.tokenChanged$.subscribe(token => {
      this.token = token;
      this.authState = token ? 'authenticated' : 'unauthenticated';
      this.cd.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe(); // Limpieza de la suscripción
    }
  }

  goRegister(){
    this.router.navigate(['/register'])
    this.visible = false
    this.cd.detectChanges()
  }

  login(){
    const formulario = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.authService.logIn(formulario).subscribe({
      next: (res : any) => {
        localStorage.setItem("st_1892@121", res.token);
        this.token = res.token;
        this.visible = false;
        this.form.reset();
        this.toastr.success(res.message + " " + res.name)
        this.cd.markForCheck();
      },
      error: (err : any) => {
        this.toastr.error(err.error.message, "Error de Autenticación")
        
        console.log(err)
      }
    })
  }

  showDialog() {
    this.visible = true;
  }
  


}
