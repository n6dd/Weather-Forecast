import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object

interface Coordinates {
 lat: number;
 lon: number;
}

// TODO: Define a class for the Weather object

class Weather {
  temperature: number;
  icon: string;
  iconDescription: string;
  humidity: number;
  windSpeed: number;
  date: string;
  city: string;

// TODO: Complete the WeatherService class

constructor(temperature: number, icon: string, iconDescription: string, humidity: number, windSpeed: number, date: string, city: string) {
  this.temperature = temperature;
  this.icon = icon;
  this.iconDescription = iconDescription;
  this.humidity = humidity;
  this.windSpeed = windSpeed;
  this.date = date;
  this.city = city;
}
}

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

  private async fetchLocationData(query: string) {
    return fetch(query)
    .then((response) => response.json())
    .then((data) => {
    const { lat, lon } = data[0];
      return { lat, lon };
      });
    }

  // TODO: Create destructureLocationData method

  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon
    };
}

  // TODO: Create buildGeocodeQuery method

  private buildGeocodeQuery(): string {
    return `${this.baseURL}/weather?q=${this.cityName}&appid=${this.apiKey}`;
}

  // TODO: Create buildWeatherQuery method

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly&appid=${this.apiKey}`;
}

  // TODO: Create fetchAndDestructureLocationData method

  private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
}

  // TODO: Create fetchWeatherData method

  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    const weatherData = await response.json();
    return weatherData;
}

  // TODO: Build parseCurrentWeather method

  private parseCurrentWeather(response: any) {
    const currentWeather = response.current;
    return new Weather(
      currentWeather.temp,
      currentWeather.weather[0].icon,
      currentWeather.weather[0].description,
      currentWeather.humidity,
      currentWeather.wind_speed,
      new Date(currentWeather.dt * 1000).toLocaleDateString(),
      response.timezone
    );
}

  // TODO: Complete buildForecastArray method

  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray = [];
    for (let i = 1; i < 6; i++) {
      const forecast = weatherData[i];
      forecastArray.push(new Weather(
        forecast.temp.day,
        forecast.weather[0].icon,
        forecast.weather[0].description,
        forecast.humidity,
        forecast.wind_speed,
        new Date(forecast.dt * 1000).toLocaleDateString(),
        currentWeather.city
      ));
    }
    return forecastArray;
  }

  // TODO: Complete getWeatherForCity method

  async getWeatherForCity(city: string) {
    this.cityName = city
    console.log('Get weather for city: ', this.cityName)
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.daily);
    console.log(currentWeather);
    console.log(forecastArray);
  }
};

export default new WeatherService();
