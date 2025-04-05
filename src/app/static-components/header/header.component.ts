import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  imports: [InputTextModule,FormsModule,Dialog,ButtonModule,ReactiveFormsModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private authService = inject(AuthService)
  private fb = inject(FormBuilder)
  private toastr = inject(ToastrService)
  private cd = inject(ChangeDetectorRef)

  value3 : string = ''
  visible: boolean = false;
  form:FormGroup

  constructor() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    const formulario = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.authService.logIn(formulario).subscribe({
      next: (res : any) => {
        localStorage.setItem("st_1892@121", res.token);
        this.visible = false;
        this.form.reset();
        this.toastr.success(res.message)
        this.cd.detectChanges();
      },
      error: (err : any) => {
        this.toastr.error(err.error.message, "Error de Autenticación")
      }
    })
  }

  showDialog() {
    this.visible = true;
  }


}
