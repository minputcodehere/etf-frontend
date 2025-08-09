import { useState, useEffect } from 'react';
import { CurrentPriceInfo, PriceHistoryItem } from '../types';
import { etfApiService } from '../services/etfApiService';
import { isYahooFinanceResponse, processYahooFinanceData, getLastNValidValues } from '../utils/dataProcessing';


export const useETFData = (symbol: string | null, range: string = '1y') => {
  const [currentPrice, setCurrentPrice] = useState<CurrentPriceInfo | null>(null);
  const [historicalData, setHistoricalData] = useState<PriceHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) {
      setCurrentPrice(null);
      setHistoricalData([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const backendData = await etfApiService.getStockData(symbol, range);

        // Only process Yahoo Finance format with new algorithm
        if (isYahooFinanceResponse(backendData)) {
          const result = processYahooFinanceData(backendData);
          setCurrentPrice(result.priceData);
          setHistoricalData(result.histData);
        } else {
          throw new Error('Only Yahoo Finance format is supported');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, range]);

  const getAveragePrice = async (days: number): Promise<number> => {
    if (!symbol) {
      return 0;
    }
    
    try {
      // Add 1 to days because API data may contain null values for recent dates
      // For 3-day average, request 4 days; for 7-day average, request 8 days, etc.
      const range = `${days + 1}d`;
      
      // Fetch fresh data for the specified range
      const backendData = await etfApiService.getStockData(symbol, range);
      
      // Only process Yahoo Finance format
      if (isYahooFinanceResponse(backendData)) {
        const adjCloses = backendData.data.indicators.adjclose[0];
        
        if (!adjCloses?.adjclose) {
          return 0;
        }
        
        // Get last N valid values from adjclose array after filtering out nulls
        // The filtering is handled in getLastNValidValues function
        const validValues = getLastNValidValues(adjCloses.adjclose, days);
        
        if (validValues.length === 0) {
          return 0;
        }
        
        const sum = validValues.reduce((acc, value) => acc + value, 0);
        const average = sum / validValues.length;
        return average;
      } else {
        throw new Error('Only Yahoo Finance format is supported');
      }
    } catch (error) {
      return 0;
    }
  };

  return {
    currentPrice,
    historicalData,
    loading,
    error,
    getAveragePrice
  };
};