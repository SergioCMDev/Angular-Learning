import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface WeatherData {
    current: {
        temperature_2m: number;
        wind_speed_10m: number;
    };
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
    private http = inject(HttpClient);

    getWeather(lat: number, lon: number): Observable<WeatherData> {
        const url = `https://api.open-meteo.com/v1/forecast`
            + `?latitude=${lat}&longitude=${lon}`
            + `&current=temperature_2m,wind_speed_10m`;

        return this.http.get<WeatherData>(url);
    }
}