import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule}  from  '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes,RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';

//define the routes for recall on the page
const routes: Routes = [
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
    ProductCategoryMenuComponent
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
