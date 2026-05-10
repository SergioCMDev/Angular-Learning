import { Component, inject, input, signal } from "@angular/core";
import { MovieService, Movie } from "./movies.service";
import { FormsModule } from "@angular/forms";
import { DBService } from "../../core/services/db.service";

@Component({
    selector: 'app-movie',
    template: `
    <p> Movies </p>
    <button (click)="search()">Buscar</button>
    <button (click)="clear()">Limpiar</button>
    <button (click)="save()">Guardar</button>

    <input [(ngModel)]="title" type="string" placeholder="Title"/>
    <input [(ngModel)]="year" type="number" placeholder="year"/>


    @if (populars().length > 0){
        <p> Movies </p>
        @for (movie of populars(); track movie.id){
            <li>  {{ movie.title}} </li>
        }
    }@else{
        <p> No movies </p>    
    }
    `,
    imports: [FormsModule]
})
export class MovieComponent {
    private movieService = inject(MovieService);
    private dbService = inject(DBService);

    populars = signal<Movie[]>([]);
    title: string | null = null;
    year: number | null = null;

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

    save() {
        if (this.title == null || this.year == null) return;
        this.dbService.save(this.title, this.year);
    }
}