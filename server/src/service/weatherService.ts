import dayjs, { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object

interface Coordinates {
 lat: number;
 lon: number;
}

// TODO: Define a class for the Weather object

class Weather {
  tempF: number;
  icon: string;
  iconDescription: string;
  humidity: number;
  windSpeed: number;
  date: Dayjs | string;
  city: string;

// TODO: Complete the WeatherService class

constructor(temperature: number, icon: string, iconDescription: string, humidity: number, windSpeed: number, date: Dayjs | string, city: string) {
  this.tempF = temperature;
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
  
  private baseURL: string = process.env.WEATHER_API_URL || 'http://api.openweathermap.org';
  private apiKey: string = process.env.WEATHER_API_KEY || '14234f1235a7a3e0b40244501b094a2b';
  private cityName: string = '';

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
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=&appid=${this.apiKey}`;
}

  // TODO: Create buildWeatherQuery method

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?units=imperial&lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
}

  // TODO: Create fetchAndDestructureLocationData method

  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
}

  // TODO: Create fetchWeatherData method

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    const weatherData = await response.json();
    return weatherData;
}

  // TODO: Build parseCurrentWeather method

  private parseCurrentWeather(response: any) {
    const currentWeather = response.list[0];
    const pDate = dayjs.unix(currentWeather.dt).format('YYYY-MM-DD');
    // console.log(currentWeather);
    return new Weather(
      currentWeather.main.temp,
      currentWeather.weather[0].icon,
      currentWeather.weather[0].description,
      currentWeather.main.humidity,
      currentWeather.wind.speed,
      pDate,
      this.cityName
    );
    };

  // TODO: Complete buildForecastArray method

  private buildForecastArray(weatherData: any[]) {
    const weatherForecast = [];
      const filterDate = weatherData[0].dt_txt.split(' ')[1];
      const filterWeather = weatherData.filter((forecast) => forecast.dt_txt.includes(filterDate));
      filterWeather.push(weatherData.at(-1));
    for (let i = 1; i < filterWeather.length; i++) {
      const forecast = filterWeather[i];
      // console.log(forecast);
      const pDate = dayjs.unix(forecast.dt).format('YYYY-MM-DD');
      const weather = new Weather(
        forecast.main.temp,
        forecast.weather[0].icon,
        forecast.weather[0].description,
        forecast.main.humidity,
        forecast.wind.speed,
        pDate,
        this.cityName
      );
      weatherForecast
      .push(weather);
  };

  return weatherForecast;
}

  // TODO: Complete getWeatherForCity method

  async getWeatherForCity(city: string) {
    this.cityName = city
    // console.log('Get weather for city: ', this.cityName)
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    //console.log(weatherData);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(weatherData.list.slice(1));
    // console.log(forecastArray);
    // console.log(currentWeather);
    return [currentWeather, ...forecastArray];
  };
};

export default new WeatherService();
