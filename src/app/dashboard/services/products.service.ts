import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API_URL = 'http://localhost:4000/api/jireh'

  private http = inject(HttpClient)

/***********************************************PRODUCTS****************************************************/ 

getAllProducts():Observable<Product[]>{
  return this.http.get<Product[]>(`${this.API_URL}/get_products`)
}

}
