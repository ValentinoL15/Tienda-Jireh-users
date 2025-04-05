import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  modalVisible = false;
  direccionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializar formulario con valores actuales
    this.direccionForm = this.fb.group({
      address: ['Calle Falsa', [Validators.required]],
      numberAddress: ['123', [Validators.required, Validators.pattern('^[0-9]+$')]],
      ciudad: ['Buenos Aires', [Validators.required]]
    });
  }

  mostrarModal(): void {
    this.modalVisible = true;
  }

  ocultarModal(): void {
    this.modalVisible = false;
  }

  guardarDireccion(): void {
    if (this.direccionForm.valid) {
      // Actualizar la vista con los nuevos datos
      const nuevaDireccion = `${this.direccionForm.value.calle} ${this.direccionForm.value.numero}, ${this.direccionForm.value.ciudad}`;
      document.getElementById('direccion-texto')!.textContent = nuevaDireccion;
      
      // Aquí iría la lógica para guardar en el backend
      console.log('Dirección actualizada:', this.direccionForm.value);
      
      this.ocultarModal();
    }
  }

}
