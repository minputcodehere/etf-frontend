import axios from 'axios';
import { APIETFResponse, YahooFinanceAPIResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ETFApiService {
  private readonly baseUrl = API_BASE_URL;

  async getStockData(symbol: string, range: string): Promise<APIETFResponse | YahooFinanceAPIResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/stock/${symbol}`,
        {
          params: { range },
          timeout: 10000
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'API call failed');
      }

      return response.data;
    } catch (error) {
      console.error('Error calling backend API:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`找不到股票代號 ${symbol}，請確認代號是否正確`);
        }
        if (error.code === 'ECONNABORTED') {
          throw new Error('連線逾時，請稍後再試');
        }
        if (error.response && error.response.status >= 500) {
          throw new Error('伺服器暫時無法回應，請稍後再試');
        }
        if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
          throw new Error('無法連接到伺服器，請檢查網路連線');
        }
        throw new Error('資料載入失敗，請稍後再試');
      }
      
      throw error instanceof Error ? error : new Error('資料載入發生未知錯誤');
    }
  }
}

export const etfApiService = new ETFApiService();