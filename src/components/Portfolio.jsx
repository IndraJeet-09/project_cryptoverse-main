import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Select, InputNumber, Button, Table, Spin, message } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title, Text } = Typography;
const { Option } = Select;

const Portfolio = () => {
  const { data, isFetching } = useGetCryptosQuery(100);
  const coins = data?.data?.coins || [];

  const [portfolio, setPortfolio] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [quantity, setQuantity] = useState(0);

  // Load saved portfolio from localStorage
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('cryptoPortfolio');
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    }
  }, []);

  // Save portfolio to localStorage
  useEffect(() => {
    localStorage.setItem('cryptoPortfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const addCoin = () => {
    if (!selectedCoin || quantity <= 0) {
      message.error('Please select a coin and enter a valid quantity.');
      return;
    }

    const coinData = coins.find(c => c.name === selectedCoin);
    if (!coinData) return;

    const existing = portfolio.find(item => item.name === selectedCoin);
    if (existing) {
      // Update quantity if coin already exists
      setPortfolio(portfolio.map(item =>
        item.name === selectedCoin
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setPortfolio([...portfolio, { name: coinData.name, symbol: coinData.symbol, price: coinData.price, quantity }]);
    }

    setSelectedCoin(null);
    setQuantity(0);
    message.success(`${selectedCoin} added to portfolio!`);
  };

  const removeCoin = (name) => {
    setPortfolio(portfolio.filter(item => item.name !== name));
    message.info(`${name} removed from portfolio.`);
  };

  const columns = [
    { title: 'Coin', dataIndex: 'name', key: 'name' },
    { title: 'Symbol', dataIndex: 'symbol', key: 'symbol' },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (qty) => qty.toLocaleString()
    },
    {
      title: 'Price (USD)',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${parseFloat(price).toFixed(2)}`
    },
    {
      title: 'Total Value',
      key: 'totalValue',
      render: (_, record) => `$${(record.quantity * parseFloat(record.price)).toFixed(2)}`
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button danger size="small" onClick={() => removeCoin(record.name)}>Remove</Button>
      )
    }
  ];

  const totalValue = portfolio.reduce((sum, coin) => sum + coin.quantity * parseFloat(coin.price), 0);

  if (isFetching) return <Spin tip="Loading Portfolio Tracker..." />;

  return (
    <Card style={{ borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <Title level={3}>Portfolio Tracker</Title>

      {/* Add Coin Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={24} md={10}>
          <Text strong>Select Coin</Text>
          <Select
            showSearch
            value={selectedCoin}
            onChange={value => setSelectedCoin(value)}
            placeholder="Select a cryptocurrency"
            style={{ width: '100%' }}
          >
            {coins.map((coin) => (
              <Option key={coin.uuid} value={coin.name}>
                {coin.name} ({coin.symbol})
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} md={6}>
          <Text strong>Quantity</Text>
          <InputNumber
            min={0}
            value={quantity}
            onChange={(value) => setQuantity(value)}
            style={{ width: '100%' }}
          />
        </Col>

        <Col xs={24} md={4}>
          <Button type="primary" style={{ marginTop: 22 }} onClick={addCoin}>Add</Button>
        </Col>
      </Row>

      {/* Portfolio Table */}
      <Table
        dataSource={portfolio}
        columns={columns}
        rowKey="name"
        pagination={false}
        style={{ marginBottom: 20 }}
      />

      {/* Total Value */}
      <Title level={4} style={{ textAlign: 'right' }}>
        Total Portfolio Value: ${totalValue.toFixed(2)}
      </Title>
    </Card>
  );
};

export default Portfolio;
