import { createContext, useContext, useState, ReactNode } from 'react';

export type TemperatureUnit = 'C' | 'F';

interface UnitContextData {
  unit: TemperatureUnit;
  toggleUnit: () => void;
  formatTemp: (celsiusTemp: number) => string;
}

const UnitContext = createContext<UnitContextData>({} as UnitContextData);

const STORAGE_UNIT_KEY = '@climaApp:unit';

export function UnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    const saved = localStorage.getItem(STORAGE_UNIT_KEY);
    return saved === 'F' ? 'F' : 'C';
  });

  const toggleUnit = () => {
    setUnit((prev) => {
      const nextUnit = prev === 'C' ? 'F' : 'C';
      localStorage.setItem(STORAGE_UNIT_KEY, nextUnit);
      return nextUnit;
    });
  };

  const formatTemp = (celsiusTemp: number): string => {
    if (unit === 'F') {
      const fahrenheit = (celsiusTemp * 9) / 5 + 32;
      return `${Math.round(fahrenheit)}°F`;
    }
    return `${Math.round(celsiusTemp)}°C`;
  };

  return (
    <UnitContext.Provider value={{ unit, toggleUnit, formatTemp }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnit() {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error('useUnit deve ser utilizado dentro de um UnitProvider');
  }
  return context;
}