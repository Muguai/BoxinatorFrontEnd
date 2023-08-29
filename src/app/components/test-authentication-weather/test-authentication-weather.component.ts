import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-test-authentication-weather',
  templateUrl: './test-authentication-weather.component.html',
  styleUrls: ['./test-authentication-weather.component.scss']
})
export class TestAuthenticationWeatherComponent implements OnInit {
  constructor(private weatherService: WeatherService, private auth: AuthenticationService) { }

  async ngOnInit() {
    this.weatherService.getWeatherData(await this.auth.getToken()).subscribe(
      (data) => {
        console.log('Weather Data:', data);
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }
}