import type { WeatherData } from '../types/weather';

const API_BASE_URL = 'http://localhost:3333/api';

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const encodedCity = encodeURIComponent(city.trim());
  const response = await fetch(`${API_BASE_URL}/weather?city=${encodedCity}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.error || 'Não foi possível obter os dados meteorológicos.';
    throw new Error(message);
  }

  return response.json();
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const response = await fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.error || 'Não foi possível obter o clima da sua localização.';
    throw new Error(message);
  }

  return response.json();
}