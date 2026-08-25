import axios from 'axios';
import type { WeatherData, GeocodingResponse, HourlyForecast, DailyForecast } from '../types/weather.js';
import { getConditionDescription } from '../utils/wmoCodes.js';
import { weatherCache } from '../config/cache.js';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_API = 'https://api.open-meteo.com/v1/forecast';

function transformForecastData(hourly: any, daily: any): { hourly: HourlyForecast[]; daily: DailyForecast[] } {
  
  const currentHourIndex = hourly.time.findIndex((t: string) => {
    const itemDate = new Date(t);
    const now = new Date();
    return itemDate >= now;
  });

  const startIndex = currentHourIndex === -1 ? 0 : currentHourIndex;
  const nextHours = hourly.time.slice(startIndex, startIndex + 6);

  const transformedHourly: HourlyForecast[] = nextHours.map((timeStr: string, idx: number) => {
    const realIndex = startIndex + idx;
    const date = new Date(timeStr);
    const formattedTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    return {
      time: formattedTime,
      temp: hourly.temperature_2m[realIndex],
      conditionCode: hourly.weather_code[realIndex],
    };
  });

  const transformedDaily: DailyForecast[] = daily.time.slice(0, 5).map((dateStr: string, idx: number) => {
    const date = new Date(dateStr + 'T00:00:00');
    const dayName = idx === 0 
      ? 'Hoje' 
      : idx === 1 
      ? 'Amanhã' 
      : date.toLocaleDateString('pt-BR', { weekday: 'long' });

    const formattedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    const code = daily.weather_code[idx];

    return {
      date: formattedDay,
      minTemp: daily.temperature_2m_min[idx],
      maxTemp: daily.temperature_2m_max[idx],
      condition: getConditionDescription(code),
      conditionCode: code,
    };
  });

  return {
    hourly: transformedHourly,
    daily: transformedDaily,
  };
}

export async function getWeatherData(cityName: string): Promise<WeatherData> {
  const normalizedCity = cityName.trim().toLowerCase();
  const cacheKey = `weather:city:${normalizedCity}`;

  const cachedData = weatherCache.get<WeatherData>(cacheKey);
  if (cachedData) {
    console.log(`⚡ [Cache HIT] Servindo dados em memória para cidade: "${cityName}"`);
    return cachedData;
  }

  console.log(`🌐 [Cache MISS] Consultando Open-Meteo para cidade: "${cityName}"`);

  const geoResponse = await axios.get<GeocodingResponse>(GEOCODING_API, {
    params: {
      name: cityName,
      count: 1,
      language: 'pt',
      format: 'json',
    },
  });

  const location = geoResponse.data.results?.[0];

  if (!location) {
    throw new Error(`Cidade "${cityName}" não encontrada.`);
  }

  const { latitude, longitude, name: resolvedCity, country_code: country } = location;

  const weatherResponse = await axios.get(FORECAST_API, {
    params: {
      latitude,
      longitude,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
      hourly: 'temperature_2m,weather_code',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min',
      timezone: 'auto',
      forecast_days: 6,
    },
  });

  const { current, hourly, daily } = weatherResponse.data;
  const { hourly: transformedHourly, daily: transformedDaily } = transformForecastData(hourly, daily);

  const weatherResult: WeatherData = {
    city: resolvedCity,
    country: country.toUpperCase(),
    temperature: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    condition: getConditionDescription(current.weather_code),
    conditionCode: current.weather_code,
    hourly: transformedHourly,
    daily: transformedDaily,
  };

  weatherCache.set(cacheKey, weatherResult);
  return weatherResult;
}
export async function getWeatherDataByCoords(latitude: number, longitude: number): Promise<WeatherData> {
  const roundedLat = latitude.toFixed(2);
  const roundedLon = longitude.toFixed(2);
  const cacheKey = `weather:coords:${roundedLat},${roundedLon}`;

  const cachedData = weatherCache.get<WeatherData>(cacheKey);
  if (cachedData) {
    console.log(`⚡ [Cache HIT] Servindo dados em memória para coordenadas: ${roundedLat}, ${roundedLon}`);
    return cachedData;
  }

  console.log(`🌐 [Cache MISS] Consultando Open-Meteo para coordenadas: ${roundedLat}, ${roundedLon}`);

  const weatherResponse = await axios.get(FORECAST_API, {
    params: {
      latitude,
      longitude,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
      hourly: 'temperature_2m,weather_code',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min',
      timezone: 'auto',
      forecast_days: 6,
    },
  });

  const { current, hourly, daily } = weatherResponse.data;
  const { hourly: transformedHourly, daily: transformedDaily } = transformForecastData(hourly, daily);

  const weatherResult: WeatherData = {
    city: 'Sua Localização',
    country: 'GPS',
    temperature: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    condition: getConditionDescription(current.weather_code),
    conditionCode: current.weather_code,
    hourly: transformedHourly,
    daily: transformedDaily,
  };

  weatherCache.set(cacheKey, weatherResult);
  return weatherResult;
}