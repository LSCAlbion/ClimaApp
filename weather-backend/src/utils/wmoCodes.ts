export const WMO_CODE_MAP: Record<number, string> = {
  0: 'Céu Limpo',
  1: 'Predominantemente Ensolarado',
  2: 'Parcialmente Nublado',
  3: 'Nublado / Encoberto',
  45: 'Névoa',
  48: 'Nevoeiro com Geada',
  51: 'Garoa Leve',
  53: 'Garoa Moderada',
  55: 'Garoa Densa',
  61: 'Chuva Fraca',
  63: 'Chuva Moderada',
  65: 'Chuva Forte',
  71: 'Neve Fraca',
  73: 'Neve Moderada',
  75: 'Neve Intensa',
  80: 'Pancadas de Chuva Fracas',
  81: 'Pancadas de Chuva Moderadas',
  82: 'Pancadas de Chuva Violentas',
  95: 'Tempestade',
  96: 'Tempestade com Granizo Leve',
  99: 'Tempestade com Granizo Forte',
};

export function getConditionDescription(code: number): string {
  return WMO_CODE_MAP[code] || 'Tempo Instável';
}