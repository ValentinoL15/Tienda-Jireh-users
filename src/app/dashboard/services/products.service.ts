import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //API_URL = 'https://tienda-jireh-service-production.up.railway.app/api/userJireh'
  API_URL = 'http://localhost:4000/api/userJireh'
  private apiColombia = 'https://api-colombia.com/api/v1/City';

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

getProductById(id: string): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.API_URL}/get_product/${id}`);
}

/***************************************************PAYMENTS***************************************************/

createPaymentOrder(id: any, payload: any) {
  return this.http.post<{ checkoutUrl: string }>(`${this.API_URL}/create_payment/${id}`, payload);
}

verifyPayment(refPayco: string): Observable<any> {
  return this.http.get(`${this.API_URL}/verify`, {
    params: { ref_payco: refPayco }
  });
}

/*******************************************************CITIES*************************************************/

getCities(): Observable<any[]> {
  return this.http.get<any[]>(this.apiColombia);
}

}
