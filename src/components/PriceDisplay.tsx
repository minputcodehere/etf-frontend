import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Card, Statistic, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { CurrentPriceInfo } from '../types';

const { Title } = Typography;

interface PriceDisplayProps {
  currentPrice: CurrentPriceInfo | null;
  previousClose?: number;
  loading: boolean;
}

dayjs.extend(utc);
dayjs.extend(timezone);

export const PriceDisplay = ({ currentPrice, previousClose, loading }: PriceDisplayProps) => {
  if (!currentPrice && !loading) return null;

  const changeAmount = currentPrice && previousClose ? currentPrice.current - previousClose : (currentPrice?.change || 0);
  const changePercent = previousClose && currentPrice ? ((currentPrice.current - previousClose) / previousClose) * 100 : (currentPrice?.changePercent || 0);
  
  const isPositive = changeAmount >= 0;
  const color = isPositive ? '#cf1322' : '#3f8600';


  return (
    <Card style={{ marginBottom: 24, textAlign: 'center' }}>
      <Title level={4} style={{ marginBottom: 16, color: '#666' }}>
        <ClockCircleOutlined style={{ marginRight: 8 }} />
        當前市價
      </Title>
      
      <Statistic
        title=""
        value={currentPrice?.current || 0}
        precision={2}
        loading={loading}
        valueStyle={{ 
          fontSize: '3rem', 
          fontWeight: 'bold',
          color: color
        }}
      />
      
      {currentPrice && (
        <div style={{ 
          fontSize: '1.2rem', 
          fontWeight: '500',
          color: color,
          marginTop: 8
        }}>
          {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          {' '}
          {changeAmount.toFixed(2)} ({Number.isFinite(changePercent) ? changePercent.toFixed(2) : '0.00'}%)
        </div>
      )}
    </Card>
  );
};