import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  try {
    WeatherService.getWeatherForCity(req.body.cityName)
    res.status(200).json([])
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {
    console.log('History data')
    res.status(200).json([])
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    console.log('History route', req.params.id)
    res.status(200).json([])
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
});

export default router;
