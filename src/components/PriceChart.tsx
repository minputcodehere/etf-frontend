import dayjs from 'dayjs';
import { Card, Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RiseOutlined } from '@ant-design/icons';
import { PriceHistoryItem } from '../types';

const { Title } = Typography;

interface PriceChartProps {
  data: PriceHistoryItem[];
  loading: boolean;
}

export const PriceChart = ({ data, loading }: PriceChartProps) => {
  // 過濾有效數據並格式化圖表數據
  const chartData = data
    .filter(item => item.price > 0 && !isNaN(item.price)) // 過濾無效數據
    .map(item => ({
      date: dayjs(item.timestamp).format('M/D'),
      price: Number(item.price?.toFixed(2))
    }));

  if (loading) {
    return (
      <Card>
        <Title level={4}>
          <RiseOutlined style={{ marginRight: 8 }} />
          全年股價趨勢圖
        </Title>
        <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          載入中...
        </div>
      </Card>
    );
  }

  // 如果沒有有效數據，顯示提示
  if (chartData.length === 0) {
    return (
      <Card>
        <Title level={4}>
          <RiseOutlined style={{ marginRight: 8 }} />
          全年股價趨勢圖
        </Title>
        <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
          暫無圖表資料
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <Title level={4} style={{ marginBottom: 16 }}>
        <RiseOutlined style={{ marginRight: 8 }} />
        全年股價趨勢圖
      </Title>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          <Tooltip 
            formatter={(value: number) => [`$${value}`, '股價']}
            labelStyle={{ color: '#000' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#1890ff" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, stroke: '#1890ff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};