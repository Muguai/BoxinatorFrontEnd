import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-test-authentication-weather',
  templateUrl: './test-authentication-weather.component.html',
  styleUrls: ['./test-authentication-weather.component.scss']
})
export class TestAuthenticationWeatherComponent {
  public apiData: any[] = [];
  public error: string | null = null;

  constructor(private weatherService: WeatherService, private auth: AuthenticationService) {}

  async start() {
      this.error = null; // Clear any previous errors
      const token = await this.auth.getToken();
      this.weatherService.getWeatherData(token).subscribe({
        next: (weatherData : any) => {
            this.apiData = weatherData;
            console.log(weatherData);
        },
        error: (error: any) => {
          console.log(error);
          this.apiData = [];
          this.error = 'ERROR retrieving data from the API';
        },
      });
  }
}


