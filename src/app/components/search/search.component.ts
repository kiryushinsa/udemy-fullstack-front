import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(value: string){
    console.log(`value=${value}`); //debug terminal
    this.router.navigateByUrl(`/search/${value}`)
    // up we use a router /search/:keyword and use ProductListComponent for changing set of products 
  }

}
