// ETF 基本資訊介面
export interface ETFInfo {
  code: string;
  name: string;
  type: 'high-dividend' | 'market-cap';
}

// 當前股價資訊介面
export interface CurrentPriceInfo {
  current: number;
  change: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
}

// 單一歷史價格資料點介面
export interface PriceHistoryItem {
  timestamp: number;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// API 歷史資料項目介面
export interface APIHistoricalDataItem {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// API ETF 資料介面
export interface APIETFData {
  symbol: string;
  name: string;
  currentPrice: number;
  priceHistory: APIHistoricalDataItem[];
  lastUpdated: string;
}

// API ETF 回應介面
export interface APIETFResponse {
  success: boolean;
  data: APIETFData;
  message: string;
}

// Yahoo Finance API 回應介面 (精簡版，只包含使用到的欄位)
export interface YahooFinanceAPIResponse {
  success: boolean;
  symbol: string;
  range: string;
  data: {
    meta: {
      chartPreviousClose: number;
      regularMarketPrice: number;
    };
    timestamp: number[];
    indicators: {
      quote: Array<{
        volume: number[];
        high: number[];
        open: number[];
        low: number[];
        close: number[];
      }>;
      adjclose: Array<{
        adjclose: number[];
      }>;
    };
  };
}