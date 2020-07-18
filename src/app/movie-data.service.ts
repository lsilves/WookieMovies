import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../Movie';

let data; // movie data

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  constructor(private http: HttpClient) { }
 
  /* Get all movies */
  getAllMovies(): Observable<Movie> {
    var myHeaders = new HttpHeaders().set("Authorization", "Bearer Wookie2019");
    data = this.http.get<Movie>('https://wookie.codesubmit.io/movies',{headers: myHeaders});
    return data;  
  }

  /* Search movies */
  searchMovies(searchQuery){
    var myHeaders = new HttpHeaders().set("Authorization", "Bearer Wookie2019");
    data = this.http.get<Movie>('https://wookie.codesubmit.io/movies?q=' + searchQuery,{headers: myHeaders});
    return data;  
  }

}
