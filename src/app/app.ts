import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherComponent } from './features/weather/weather.component';
import { MovieComponent } from './features/movies/movies.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherComponent, MovieComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('project');
}
