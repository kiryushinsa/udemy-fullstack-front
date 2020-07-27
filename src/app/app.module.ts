import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule}  from  '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes,RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';

//define the routes for recall on the page
const routes: Routes = [
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id/:name',component: ProductListComponent}, // when path mathes create new instance of component
  {path: 'category',component: ProductListComponent}, // by category
  {path: 'products',component: ProductListComponent}, // by products
  {path: '',redirectTo: '/products', pathMatch: 'full'}, // if empty need to redirect on /products; 'ful' - you need to associate full path 
  {path: '**',redirectTo: '/products', pathMatch: 'full'}, // generic ** universal path; no match with any path send to /products
]; 
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent
  ],
  imports: [
    RouterModule.forRoot(routes), //import for rotes from const
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
