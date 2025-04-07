import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isLoading$ = signal<boolean>(false);
  public show(): void {
    this.isLoading$.set(true)
  }
  public hide(): void {
    this.isLoading$.set(false) 
  }
}
