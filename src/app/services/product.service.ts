import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl =  'http://localhost:8080/api/products'

  //injecr Httpclient
  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable <Product[]> {

    // map the json data from spring data rest to Product array
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products) // _embedded get from response in spring 
    )
  }
}

interface GetResponse{
  //hepled to unwraps the Json from Spring Data Rest _embedded entry 
  // array of products
  _embedded: {
    products: Product[];
  }
}