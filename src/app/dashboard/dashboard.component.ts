import { Component, OnInit } from '@angular/core';
import { Movie } from '../../Movie';
import { MovieDataService } from '../movie-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public movies: any; // list of movies
  public openDetailsView = false; // determines if movie detail view on/off
  public genres = []; // list of genres
  private querySub: any; // API subscription
  public searchQuery: String; // search query

  constructor(private data: MovieDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => { // subscribe to URL parameters
      this.openDetailsView = (queryParams.id) ? true : false;
      this.searchQuery = (queryParams.q ? queryParams.q : null);
      this.getPage(this.searchQuery);
    });
  }

  /* Get page of movies */
  getPage(_searchQuery){
    if(_searchQuery == null){ // no search query
      this.data.getAllMovies().subscribe(data =>{
        if(data != null){
          this.movies = data.movies;
          this.getGenres();
        }
      });
    }
    else{ // filter by search query
      this.querySub = this.data.searchMovies(_searchQuery).subscribe(data => {
        if(data != null){
          this.movies = data.movies;
          this.getGenres();
        }
      });
    }
  }

  /* Get list of movie genres */
  getGenres(){ 
    for(let i = 0; i < this.movies.length; i++){
      for(let j = 0; j < this.movies[i].genres.length; j++){
        if(this.genres.indexOf(this.movies[i].genres[j]) == -1){
          this.genres.push(this.movies[i].genres[j]);
        }
      }
    }
  }

  /* Filter by genre */
  filterByGenre(genre){
    return this.movies.filter(m => m.genres.indexOf(genre) != -1);
  }

}
