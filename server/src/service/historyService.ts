import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(
    name: string,
    id: string
  ) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try {
      const data = await fs.promises.readFile('./db/db.json', 'utf8');
      console.log(data);
      return data ? data : '[]';
    } catch (err) {
      console.error('Error reading file:', err);
      return '[]'; 
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    try {
      await fs.promises.writeFile('./db/db.json', JSON.stringify(cities, null, 2));
    } catch (err) {
      console.error('Error writing file:', err);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    const data = await this.read();
    try {
      const citiesArray = JSON.parse(data);
      console.log(citiesArray);
      return Array.isArray(citiesArray) ? citiesArray : [];
    } catch (err) {
      console.error('Error parsing JSON:', err);
      return [];
    }
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const tempCity = new City(city, uuidv4());
    const currentCitiesData = await this.getCities();
    currentCitiesData.push(tempCity);
    await this.write(currentCitiesData);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const currentCitiesData = await this.getCities();
    const updatedCitiesData = currentCitiesData.filter(city => city.id !== id);
    await this.write(updatedCitiesData);
    return updatedCitiesData;
  }
}

export default new HistoryService();
