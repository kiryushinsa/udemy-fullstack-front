import { Component, OnInit } from '@angular/core';
import {ProductService} from 'src/app/services/product.service'
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number; // id of current category
  currentCategoryName: string;
  searchMode: boolean;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit() { 
    //similar @PostConstruct
    // hook where our app calling a list product method
    this.route.paramMap.subscribe(() =>{//
    this.listProducts();
    });
  }



  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword'); // if we have search param on seacrch component - 1 true

      if(this.searchMode){
        this.handleSearchProducts();
      }
      else{
        this.handleListProducts();
      }
  }






  handleSearchProducts(){
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    //now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data =>{
        this.products = data;
      }
    )
  }


  handleListProducts(){
    //check if id parametr is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id'); // link category/:id routes

    if(hasCategoryId){
    //get the id param string. convert string to a number using the + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id'); 
      // get the name param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    }
    else {
      // if no category choose print 1 id Books Category
      //not category available  id eavailable ... default to category id 1
      this.currentCategoryId = 1; 
      this.currentCategoryName = 'Books'; // default
    }

    //now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(  //method invoke after subscribe
      data => { // used asynchronized
        this.products = data; // result are asign to the Product array
      }
    )

  }

  addToCart(theProduct: Product){

    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice} `)
    //todo real work
    const theCartItem = new CartItem (theProduct);
    this.cartService.addToCart(theCartItem);
  }

  

  
}
