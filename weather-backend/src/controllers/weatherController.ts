import { Request, Response } from 'express';
import { getWeatherData, getWeatherDataByCoords } from '../services/weatherService.js';

export async function handleGetWeather(req: Request, res: Response): Promise<void> {
  const { city, lat, lon } = req.query;

  try {
    if (lat && lon) {
      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lon as string);

      if (isNaN(latitude) || isNaN(longitude)) {
        res.status(400).json({ error: 'Latitude e Longitude devem ser valores numéricos válidos.' });
        return;
      }

      const weather = await getWeatherDataByCoords(latitude, longitude);
      res.status(200).json(weather);
      return;
    }

    if (city && typeof city === 'string' && city.trim()) {
      const weather = await getWeatherData(city);
      res.status(200).json(weather);
      return;
    }

    res.status(400).json({ error: 'Envie o parâmetro "city" ou as coordenadas "lat" e "lon".' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Erro interno no servidor ao processar o clima.' });
  }
}