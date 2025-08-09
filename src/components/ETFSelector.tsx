import { Select, Row, Col, Typography } from 'antd';
import { ETF_DATABASE, ETF_TYPE_OPTIONS, DEFAULT_ETF_TYPE, DEFAULT_ETF_CODE } from '../utils/constants';

const { Title } = Typography;
const { Option } = Select;

interface ETFSelectorProps {
  selectedType: string;
  selectedCode: string;
  onTypeChange: (type: string) => void;
  onCodeChange: (code: string) => void;
}

export const ETFSelector = ({
  selectedType,
  selectedCode,
  onTypeChange,
  onCodeChange
}: ETFSelectorProps) => {
  const handleTypeChange = (value: string) => {
    onTypeChange(value);
    const firstETF = ETF_DATABASE[value]?.[0];
    if (firstETF) {
      onCodeChange(firstETF.code);
    }
  };

  const availableETFs = selectedType ? ETF_DATABASE[selectedType] || [] : [];

  return (
    <div style={{ marginBottom: 24 }}>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Title level={5}>1. 選擇 ETF 類型</Title>
          <Select
            value={selectedType || DEFAULT_ETF_TYPE}
            onChange={handleTypeChange}
            style={{ width: '100%' }}
            size="large"
            placeholder="請選擇類型..."
          >
            {ETF_TYPE_OPTIONS.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={12}>
          <Title level={5}>2. 選擇 ETF 代號</Title>
          <Select
            value={selectedCode || DEFAULT_ETF_CODE}
            onChange={onCodeChange}
            style={{ width: '100%' }}
            size="large"
            placeholder="請選擇代號..."
            disabled={!selectedType}
          >
            {availableETFs.map(etf => (
              <Option key={etf.code} value={etf.code}>
                {etf.code} {etf.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
};