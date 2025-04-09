import { Component, inject } from "@angular/core";
import { ProgressSpinner } from 'primeng/progressspinner';
import { SpinnerService } from "./spinner.service";


@Component({
  selector: "app-spinner",
  standalone:true,
  imports: [ProgressSpinner],
  template: `
  @if (isLoading()) {
    <div class="overlay">
    <p-progress-spinner ariaLabel="loading" />
    </div>
  }
  `,
   styles: [
    `
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999; /* Asegúrate de que esté por encima de otros elementos */
      }

      .spinner {
        width: 70px; /* Ajusta el tamaño del spinner */
        height: 70px;
      }
    `,
  ],
})
export class MyComponent {

  private readonly spinnerSer = inject(SpinnerService);
  isLoading = this.spinnerSer.isLoading$

}