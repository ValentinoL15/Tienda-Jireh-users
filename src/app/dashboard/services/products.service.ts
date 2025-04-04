import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API_URL = 'http://localhost:4000/api/userJireh'

  private http = inject(HttpClient)

/***********************************************PRODUCTS****************************************************/ 

getAllProducts(skip: number = 0, limit: number = 3,):Observable<Product[]>{
  const params: any = {
    skip: skip.toString(),
    limit: limit.toString(),
  }
  return this.http.get<Product[]>(`${this.API_URL}/get_products`, { params })
}

getProductsByGender(brand:any, gender:any):Observable<Product[]>{
  return this.http.get<Product[]>(`${this.API_URL}/get_products_by_gender/${brand}/${gender}`)
}

}
