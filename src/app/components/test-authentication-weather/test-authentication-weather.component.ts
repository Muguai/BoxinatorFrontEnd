import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-test-authentication-weather',
  templateUrl: './test-authentication-weather.component.html',
  styleUrls: ['./test-authentication-weather.component.scss']
})
export class TestAuthenticationWeatherComponent implements OnInit {
  constructor(private weatherService: WeatherService, private auth: AuthenticationService) { 
   
    
  }

  async start(){
    this.weatherService.getWeatherData(await this.auth.getToken()).subscribe({
      next: (data : any) => {
          console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      },
    }
    );
  }

  async ngOnInit() {
    setTimeout(() => {
      this.start()
    }, 1000);
  }
}