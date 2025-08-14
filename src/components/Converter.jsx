import React, { useState, useEffect } from 'react';
import { Select, InputNumber, Card, Typography, Row, Col, Spin } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title, Text } = Typography;
const { Option } = Select;

const Converter = () => {
  const { data: cryptoList, isFetching } = useGetCryptosQuery(100); // top 100 coins
  const [fromCurrency, setFromCurrency] = useState('Bitcoin');
  const [toCurrency, setToCurrency] = useState('Ethereum');
  const [amount, setAmount] = useState(1);
  const [convertedValue, setConvertedValue] = useState(0);

  const cryptos = cryptoList?.data?.coins || [];

  useEffect(() => {
    if (cryptos.length) {
      const fromPrice = cryptos.find(c => c.name === fromCurrency)?.price || 1;
      const toPrice = cryptos.find(c => c.name === toCurrency)?.price || 1;
      setConvertedValue((amount * fromPrice) / toPrice);
    }
  }, [amount, fromCurrency, toCurrency, cryptos]);

  if (isFetching) return <Spin tip="Loading Converter..." />;

  return (
    <Card style={{ borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <Title level={3}>Crypto Converter</Title>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={10}>
          <Text strong>From:</Text>
          <Select
            showSearch
            value={fromCurrency}
            onChange={(value) => setFromCurrency(value)}
            style={{ width: '100%', marginTop: 5 }}
          >
            {cryptos.map((currency) => (
              <Option key={currency.uuid} value={currency.name}>
                {currency.name} ({currency.symbol})
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={4} style={{ textAlign: 'center' }}>
          <Text strong>Amount</Text>
          <InputNumber
            min={0}
            value={amount}
            onChange={(value) => setAmount(value)}
            style={{ width: '100%', marginTop: 5 }}
          />
        </Col>

        <Col xs={24} sm={10}>
          <Text strong>To:</Text>
          <Select
            showSearch
            value={toCurrency}
            onChange={(value) => setToCurrency(value)}
            style={{ width: '100%', marginTop: 5 }}
          >
            {cryptos.map((currency) => (
              <Option key={currency.uuid} value={currency.name}>
                {currency.name} ({currency.symbol})
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Row style={{ marginTop: 20 }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title level={4} style={{ marginBottom: 0 }}>
            {amount} {fromCurrency} = {convertedValue.toFixed(6)} {toCurrency}
          </Title>
        </Col>
      </Row>
    </Card>
  );
};

export default Converter;
