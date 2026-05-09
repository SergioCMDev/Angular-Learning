import { Component, inject, input, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { WeatherService, WeatherData } from "./weather.service";

@Component({
    selector: 'app-weather',
    template: `
    <input [(ngModel)]="lat" type="number" placeholder="Latitud"/>
    <input [(ngModel)]="long" type="number" placeholder="Longitud"/>
    <button (click)="search()">Buscar</button>
    <button (click)="clear()">Limpiar</button>



    @if (loading()){
        <p>🌡️ Temperatura: {{ weather()!.current.temperature_2m }}°C</p>
        <p>💨 Viento: {{ weather()!.current.wind_speed_10m }} km/h</p>
    } @else if(error()) {
        <p>Datos incorrectos {{error_message}} </p>
    }@else{
        <p>Introduce Datos...</p>
    }
    `,
    imports: [FormsModule]
})
export class WeatherComponent {
    private weatherService = inject(WeatherService);
    weather = signal<WeatherData | null>(null);
    lat: number | null = null;
    long: number | null = null;
    loading = signal(false);
    error = signal(false);
    error_message: string = ""
    search() {
        if (this.lat == null || this.long == null) return;
        this.weatherService.getWeather(this.lat, this.long).subscribe({
            next: data => {
                console.log('Datos recibidos:', data);
                this.weather.set(data);
                this.loading.set(true);
                this.error.set(false);
                this.error_message = "";

            },
            error: err => {
                console.log("Error ${err}");
                this.error_message = err[0];
                this.error.set(true);
                this.loading.set(false);

            }
        });

    }
    clear() {
        this.error.set(false);
        this.loading.set(false);
        this.lat = 0;
        this.long = 0;

    }

    // ngOnInit(): void {
    //     this.weatherService.getWeather(this.lat, this.long).subscribe({
    //         next: data => {
    //             console.log('Datos recibidos:', data);
    //             this.weather.set(data);
    //         }
    //     });
    // }
}