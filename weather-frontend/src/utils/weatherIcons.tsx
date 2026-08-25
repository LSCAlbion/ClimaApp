import React from 'react';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  Snowflake, 
  CloudLightning 
} from 'lucide-react';

export function getWeatherIcon(code: number, className = 'w-10 h-10'): React.ReactNode {
  
  switch (code) {
    case 0: 
      return <Sun className={`${className} text-amber-400`} />;
    case 1:
    case 2: 
      return <CloudSun className={`${className} text-amber-300`} />;
    case 3: 
      return <Cloud className={`${className} text-slate-300`} />;
    case 45:
    case 48: 
      return <CloudFog className={`${className} text-slate-400`} />;
    case 51:
    case 53:
    case 55: 
      return <CloudDrizzle className={`${className} text-blue-300`} />;
    case 61:
    case 63:
    case 65: 
    case 80:
    case 81:
    case 82:
      return <CloudRain className={`${className} text-blue-400`} />;
    case 71:
    case 73:
    case 75: 
      return <Snowflake className={`${className} text-cyan-200`} />;
    case 95:
    case 96:
    case 99: 
      return <CloudLightning className={`${className} text-purple-400`} />;
    default:
      return <Sun className={`${className} text-amber-400`} />;
  }
}