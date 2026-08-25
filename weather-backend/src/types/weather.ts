export interface HourlyForecast {
  time: string;
  temp: number;
  conditionCode: number;
}

export interface DailyForecast {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  conditionCode: number;
}

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  conditionCode: number;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

// Tipos auxiliares das respostas brutas da Open-Meteo
export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  admin1?: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}