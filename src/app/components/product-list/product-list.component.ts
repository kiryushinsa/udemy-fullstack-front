import { Component, OnInit } from '@angular/core';
import {ProductService} from 'src/app/services/product.service'
import { Product } from 'src/app/common/product';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit() { //similar @PostConstruct
    // hook where our app calling a list product method
    this.listProducts();
  }

  listProducts() {
    this.productService.getProductList().subscribe(  //method invoke after subscribe
      data => { // used asynchronized
        this.products = data; // result are asign to the Product array
      }
    )
  }
}
