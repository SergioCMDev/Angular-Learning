import { Component, inject, signal } from "@angular/core";
import { MovieService, Movie } from "./movies.service";
@Component({
    selector: 'app-movie',
    template: `
    <p> Movies </p>
    <button (click)="search()">Buscar</button>
    <button (click)="clear()">Limpiar</button>

    @if (populars().length > 0){
        <p> Movies </p>
        @for (movie of populars(); track movie.id){
            <li>  {{ movie.title}} </li>
        }
    }@else{
        <p> No movies </p>    
    }
    `,
    imports: []
})
export class MovieComponent {
    private movieService = inject(MovieService);
    populars = signal<Movie[]>([]);

    search() {
        this.movieService.getPopular().subscribe({
            next: data => {
                console.log("Datos recibidos", data);
                this.populars.set(data.results);
            },
            error: err => {

            }
        });
    }
    clear() {
        this.populars.set([]);
    }
}