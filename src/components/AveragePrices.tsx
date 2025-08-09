import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface AveragePricesProps {
  getAveragePrice: (days: number) => Promise<number>;
  loading: boolean;
}

export const AveragePrices = ({ getAveragePrice, loading }: AveragePricesProps) => {
  const [averagePrices, setAveragePrices] = useState<Record<number, number>>({});
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});

  const averagePeriods = useMemo(() => [
    { days: 3, label: '三日均價' },
    { days: 7, label: '週均價' },
    { days: 30, label: '月均價' },
    { days: 90, label: '季均價' },
    { days: 180, label: '半年均價' },
    { days: 365, label: '年均價' }
  ], []);

  const fetchAveragePrices = useCallback(async () => {
      if (loading) return;

      // 初始化 loading 狀態
      const initialLoadingStates = averagePeriods.reduce((acc, period) => {
        acc[period.days] = true;
        return acc;
      }, {} as Record<number, boolean>);
      setLoadingStates(initialLoadingStates);

      // 並行計算所有平均價格
      const pricePromises = averagePeriods.map(async (period) => {
        try {
          const price = await getAveragePrice(period.days);
          return { days: period.days, price };
        } catch (error) {
          return { days: period.days, price: 0 };
        }
      });

      const results = await Promise.all(pricePromises);
      
      // 更新平均價格和 loading 狀態
      const newPrices: Record<number, number> = {};
      const newLoadingStates: Record<number, boolean> = {};
      
      results.forEach(({ days, price }) => {
        newPrices[days] = price;
        newLoadingStates[days] = false;
      });
      
      setAveragePrices(newPrices);
      setLoadingStates(newLoadingStates);
    }, [loading, getAveragePrice, averagePeriods]);

  useEffect(() => {
    fetchAveragePrices();
  }, [loading, fetchAveragePrices]);

  return (
    <div style={{ marginBottom: 24 }}>
      <Title level={4} style={{ textAlign: 'center', marginBottom: 24, color: '#666' }}>
        <BarChartOutlined style={{ marginRight: 8 }} />
        歷史平均股價
      </Title>
      
      <Row gutter={[16, 16]}>
        {averagePeriods.map(period => (
          <Col xs={24} sm={12} lg={8} key={period.days}>
            <Card hoverable style={{ height: '100%' }}>
              <Statistic
                title={period.label}
                value={averagePrices[period.days] || 0}
                precision={2}
                loading={loading || loadingStates[period.days]}
                valueStyle={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold',
                  color: averagePrices[period.days] > 0 ? '#1890ff' : '#ff4d4f'
                }}
                suffix={averagePrices[period.days] === 0 ? '無資料' : ''}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};