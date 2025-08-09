import { ETFInfo } from '../types';

export const ETF_DATABASE: Record<string, ETFInfo[]> = {
  'high-dividend': [
    { code: '0056.TW', name: '元大高股息', type: 'high-dividend' },
    { code: '00878.TW', name: '國泰永續高股息', type: 'high-dividend' },
    { code: '00919.TW', name: '國泰台灣5G+', type: 'high-dividend' }
  ],
  'market-cap': [
    { code: '0050.TW', name: '元大台灣50', type: 'market-cap' },
    { code: '006208.TW', name: '富邦台50', type: 'market-cap' }
  ]
};

export const ETF_TYPE_OPTIONS = [
  { value: 'high-dividend', label: '高股息型' },
  { value: 'market-cap', label: '市值型' }
];

export const DEFAULT_ETF_TYPE = 'high-dividend';
export const DEFAULT_ETF_CODE = '0056.TW';