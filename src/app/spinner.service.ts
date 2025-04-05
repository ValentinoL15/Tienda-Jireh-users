import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isLoading$ = signal<boolean>(false);
  public show(): void {
    console.log('Spinner is showing');
    this.isLoading$.set(true)
  }
  public hide(): void {
    console.log('Spinner is hiding');
    this.isLoading$.set(false) 
  }
}
