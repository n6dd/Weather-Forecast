import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object

const APIKey = "14234f1235a7a3e0b40244501b094a2b";

//interface Coordinates {
//  lat: number;
//  lon: number;
//}

// TODO: Define a class for the Weather object

// class Weather {
//   temperature: number;
//   description: string;
//   humidity: number;
//   windSpeed: number;

// // TODO: Complete the WeatherService class

// constructor(temperature: number, description: string, humidity: number, windSpeed: number) {
//   this.temperature = temperature;
//   this.description = description;
//   this.humidity = humidity;
//   this.windSpeed = windSpeed;
// }
// }

class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURL = 'https://api.openweathermap.org/data/2.5';
    this.apiKey = process.env.WEATHER_API_KEY || '';
    this.cityName = '';
  }

  // TODO: Create fetchLocationData method

  //private async fetchLocationData(query: string) {}

  // TODO: Create destructureLocationData method

  //private destructureLocationData(locationData: Coordinates): Coordinates {}

  // TODO: Create buildGeocodeQuery method

  //private buildGeocodeQuery(): string {}

  // TODO: Create buildWeatherQuery method

  //private buildWeatherQuery(coordinates: Coordinates): string {}

  // TODO: Create fetchAndDestructureLocationData method

  //private async fetchAndDestructureLocationData() {}

  // TODO: Create fetchWeatherData method

  //private async fetchWeatherData(coordinates: Coordinates) {}

  // TODO: Build parseCurrentWeather method

  //private parseCurrentWeather(response: any) {}

  // TODO: Complete buildForecastArray method

  //private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}

  // TODO: Complete getWeatherForCity method

  async getWeatherForCity(city: string) {
    this.cityName = city
    console.log('Get weather for city: ', this.cityName)
    console.log(this.apiKey)
    console.log(this.baseURL)
  }

}

export default new WeatherService();
