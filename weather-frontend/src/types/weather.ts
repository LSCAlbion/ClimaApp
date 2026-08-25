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