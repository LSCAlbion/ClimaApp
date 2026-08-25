import type { WeatherData } from '../types/weather';

export const mockWeatherData: WeatherData = {
  city: 'Anápolis',
  country: 'BR',
  temperature: 24,
  feelsLike: 25,
  humidity: 62,
  windSpeed: 14,
  condition: 'Parcialmente Nublado',
  conditionCode: 2,
  hourly: [
    { time: '10:00', temp: 22, conditionCode: 1 },
    { time: '12:00', temp: 25, conditionCode: 2 },
    { time: '14:00', temp: 26, conditionCode: 2 },
    { time: '16:00', temp: 24, conditionCode: 3 },
    { time: '18:00', temp: 21, conditionCode: 1 },
    { time: '20:00', temp: 20, conditionCode: 0 },
  ],
  daily: [
    { date: 'Hoje', minTemp: 18, maxTemp: 26, condition: 'Parcialmente Nublado', conditionCode: 2 },
    { date: 'Amanhã', minTemp: 17, maxTemp: 27, condition: 'Ensolarado', conditionCode: 0 },
    { date: 'Sábado', minTemp: 19, maxTemp: 25, condition: 'Chuva Leve', conditionCode: 61 },
    { date: 'Domingo', minTemp: 18, maxTemp: 24, condition: 'Chuva Moderada', conditionCode: 63 },
  ],
};