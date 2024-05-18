import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public searchProducts(keyword: string = '', page: number = 1, size: number = 4): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(`http://localhost:8089/products`, {
      observe: 'response',
      params: {
        name_like: keyword,
        _page: page.toString(),
        _limit: size.toString()
      }
    });
  }

  public checkProduct(product: Product): Observable<any> {
    return this.http.patch(`http://localhost:8089/products/${product.id}`, { checked: !product.checked });
  }

  public deleteProduct(product: Product): Observable<any> {
    return this.http.delete(`http://localhost:8089/products/${product.id}`);
  }

  public saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8089/products`, product);
  }
  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8089/products/${id}`);
  }
  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`, product);
  }
}
