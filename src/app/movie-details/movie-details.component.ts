import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../Movie';
import { MovieDataService } from '../movie-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  // movie information fields
  public poster: String;
  public title: String;
  public rating: Number;
  public rating_stars: any;
  public date: Date;
  public length: String;
  public director: String;
  public cast: String;
  public description: String;

  public showDetailsView = true; // determines if movie detail view on/off
  public searchQuery: String; // search query

  constructor(private route: ActivatedRoute, private data: MovieDataService, private router: Router) { }

  ngOnInit(): void {
    this.getMovieDetails(this.route.snapshot.queryParams.id);
    this.route.queryParams.subscribe(queryParams => { // subscribe to URL parameters
      this.searchQuery = (queryParams.q ? queryParams.q : null);
      this.getMovieDetails(queryParams.id);
    })
  }

  /* Get movie */ 
  getMovieDetails(_id){
    let movies;
    let movie;

    this.data.getAllMovies().subscribe(data =>{
      if(data != null){
        movies = data.movies;
        movie = movies.filter(m => m.id.indexOf(_id) != -1);
        this.getValues(movie[0]);
        this.showDetailsView = true;
      }
    })
  }

  /* Get and format movie values */
  getValues(_movie){
    this.poster = _movie.poster;
    this.title = _movie.title;
    this.rating = _movie.imdb_rating;
    this.rating_stars = this.getRatingStars(this.rating);
    this.date = new Date(_movie.released_on);
    this.length = _movie.length;
    this.director = _movie.director instanceof Array ? 
      this.getConcatenatedString(_movie.director) : _movie.director;
    this.cast = this.getConcatenatedString(_movie.cast);
    this.description = _movie.overview;
  }

  /* Get concatenated string */
  getConcatenatedString(_array) {
    let returnString = "";
    let index = 0;

    for(index; index < _array.length - 1; index++){
      returnString += (_array[index] + ", ")
    }
    returnString +=  _array[index++];
    return returnString;
  }

  /* Get movie rating in stars */
  getRatingStars(_rating){
    let stars = [];
    let s_rating = ((Math.floor(_rating))/2);

    for(let i = 0; i < (Math.floor(s_rating)); i++){
      stars[i] = 'star';
    }
    if (((_rating/2)%1) >= 0.5) { // add half star
      stars[stars.length] = 'star_half';
    }
    if(stars.length < 5){
      for(let i = stars.length; i < 5; i++){
        stars[i] = 'star_outline'
      }
    }
    return stars;
  }

  /* Close movie detail view */
  closeView(){
    this.showDetailsView = !this.showDetailsView;
  }

}
