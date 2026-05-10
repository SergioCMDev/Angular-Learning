import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";


export interface Movie {
    id: number;
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number
}

export interface MovieResponse {
    results: Movie[];
    total_pages: number;
    total_results: number;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
    private http = inject(HttpClient);
    private apiKey = environment.tmdbApiKey;
    private baseUrl = 'https://api.themoviedb.org/3';

    getPopular(): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
    }

    searchMovie(query: string) {
        return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`);
    }

}