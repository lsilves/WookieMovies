import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  public searchQuery: String; // search query

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  /* Submit search query */
  formSubmit(f: NgForm): void {
    this.route.navigate(['/dashboard/'], {queryParams: {q: this.searchQuery}});
   }

}
