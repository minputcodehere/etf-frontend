import { CurrentPriceInfo, PriceHistoryItem, YahooFinanceAPIResponse } from '../types';

// Helper function to find last non-null value from array
export const findLastNonNullValue = (arr: (number | null)[]): number | null => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] !== null && arr[i] !== undefined) {
      return arr[i] as number;
    }
  }
  return null;
};

// Helper function to get last N valid (non-null) values from array
// Filters out null values first, then takes the last N values
export const getLastNValidValues = (arr: (number | null)[], n: number): number[] => {
  // First filter out null/undefined values
  const filteredValues = arr.filter((value): value is number => value !== null && value !== undefined);
  
  // Then take the last N values from the filtered array
  return filteredValues.slice(-n);
};

// Helper function to check if response is Yahoo Finance format
export const isYahooFinanceResponse = (data: any): data is YahooFinanceAPIResponse => {
  return data?.data?.meta && data?.data?.timestamp && data?.data?.indicators;
};

// Process Yahoo Finance data using the updated algorithm
export const processYahooFinanceData = (yahooData: YahooFinanceAPIResponse): { priceData: CurrentPriceInfo; histData: PriceHistoryItem[] } => {
  const { meta, timestamp, indicators } = yahooData.data;
  
  if (!timestamp || timestamp.length === 0) {
    throw new Error('No timestamp data available');
  }

  const quotes = indicators.quote[0];
  const adjCloses = indicators.adjclose[0];
  
  if (!quotes || !adjCloses) {
    throw new Error('No price data available');
  }

  // Create historical data from Yahoo Finance format, filtering out null values
  const histData: PriceHistoryItem[] = timestamp
    .map((time, index) => {
      const adjClose = adjCloses.adjclose[index];
      const close = quotes.close[index];
      const open = quotes.open[index];
      const high = quotes.high[index];
      const low = quotes.low[index];
      const volume = quotes.volume[index];
      
      // Skip entries where critical data is null
      if (adjClose === null || close === null) {
        return null;
      }
      
      return {
        timestamp: time * 1000,
        price: adjClose,
        open: open || 0,
        high: high || 0,
        low: low || 0,
        close: close,
        volume: volume || 0
      };
    })
    .filter((item): item is PriceHistoryItem => item !== null);

  if (histData.length === 0) {
    throw new Error('No valid price data available after filtering');
  }

  // Use new algorithm for current price and change calculation
  // 1. Current price from regularMarketPrice
  const currentPrice = meta.regularMarketPrice;
  
  // 2. Find last non-null adjclose for comparison
  const lastNonNullAdjClose = findLastNonNullValue(adjCloses.adjclose);
  
  if (lastNonNullAdjClose === null) {
    throw new Error('No valid previous close price available');
  }
  
  // 3. Calculate change and change percent
  const change = currentPrice - lastNonNullAdjClose;
  const changePercent = (change / lastNonNullAdjClose) * 100;
  
  // Get latest valid data for day high/low/volume
  const latestData = histData[histData.length - 1];

  const priceData: CurrentPriceInfo = {
    current: currentPrice,
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    dayHigh: latestData.high,
    dayLow: latestData.low,
    volume: latestData.volume
  };

  return { priceData, histData };
};