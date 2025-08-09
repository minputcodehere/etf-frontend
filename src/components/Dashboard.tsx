import { useState } from 'react';
import dayjs from 'dayjs';
import { Layout, Typography, Card, Space, Alert } from 'antd';
import { ETFSelector } from './ETFSelector';
import { PriceDisplay } from './PriceDisplay';
import { AveragePrices } from './AveragePrices';
import { PriceChart } from './PriceChart';
import { useETFData } from '../hooks/useETFData';
import { DEFAULT_ETF_TYPE, DEFAULT_ETF_CODE, ETF_DATABASE } from '../utils/constants';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export const Dashboard = () => {
  const [selectedType, setSelectedType] = useState<string>(DEFAULT_ETF_TYPE);
  const [selectedCode, setSelectedCode] = useState<string>(DEFAULT_ETF_CODE);

  const { currentPrice, historicalData, loading, error, getAveragePrice } = useETFData(selectedCode);


  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    const firstETF = ETF_DATABASE[type]?.[0];
    if (firstETF) {
      setSelectedCode(firstETF.code);
    }
  };

  const selectedETF = ETF_DATABASE[selectedType]?.find(etf => etf.code === selectedCode);
  const etfTitle = selectedETF ? `${selectedETF.code} ${selectedETF.name}` : '';

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Header style={{ 
        backgroundColor: '#fff', 
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          height: '100%'
        }}>
          <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
            ETF 股價儀表板
          </Title>
          <Text type="secondary">
            最後更新：{dayjs().format('HH:mm:ss')}
          </Text>
        </div>
      </Header>

      <Content style={{ padding: '24px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card>
            <ETFSelector
              selectedType={selectedType}
              selectedCode={selectedCode}
              onTypeChange={handleTypeChange}
              onCodeChange={setSelectedCode}
            />
          </Card>

          {selectedCode && (
            <>
              {etfTitle && (
                <Title level={2} style={{ textAlign: 'center', margin: '24px 0', fontWeight: 300 }}>
                  {etfTitle}
                </Title>
              )}

              {error && (
                <Alert
                  message="資料載入錯誤"
                  description={error}
                  type="error"
                  showIcon
                  closable
                />
              )}

              <PriceDisplay 
                currentPrice={currentPrice} 
                previousClose={historicalData?.[historicalData.length - 2]?.close}
                loading={loading} 
              />
              
              <AveragePrices getAveragePrice={getAveragePrice} loading={loading} />
              
              <PriceChart data={historicalData} loading={loading} />
            </>
          )}
        </Space>
      </Content>
    </Layout>
  );
};