import { Component, inject, OnInit, signal } from "@angular/core";
import { WeatherService, WeatherData } from "./weather.service";

@Component({
    selector: 'app-weather',
    template: `
    @if (weather()){
        <p>🌡️ Temperatura: {{ weather()!.current.temperature_2m }}°C</p>
        <p>💨 Viento: {{ weather()!.current.wind_speed_10m }} km/h</p>
    } @else {
        <p>Cargando...</p>
    }
    `
})
export class WeatherComponent implements OnInit {
    private weatherService = inject(WeatherService);
    weather = signal<WeatherData | null>(null);

    ngOnInit(): void {
        this.weatherService.getWeather(36.5, -4.6).subscribe({
            next: data => {
                console.log('Datos recibidos:', data);
                this.weather.set(data);
            }
        });
    }
}