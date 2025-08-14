import React from 'react';
import { Card, Typography, Row, Col, List, Tag, Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title } = Typography;

const TopMovers = () => {
  const { data, isFetching } = useGetCryptosQuery(100); // top 100 coins
  const coins = data?.data?.coins || [];

  if (isFetching) return <Spin tip="Loading Market Movers..." />;

  // Sort by 24h change
  const sortedCoins = [...coins].sort(
    (a, b) => parseFloat(b.change) - parseFloat(a.change)
  );

  const topGainers = sortedCoins.slice(0, 5);
  const topLosers = sortedCoins.slice(-5).reverse();

  const renderList = (items, type) => (
    <List
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(coin) => (
        <List.Item>
          <List.Item.Meta
            title={
              <>
                <img src={coin.iconUrl} alt={coin.name} style={{ width: 20, marginRight: 8 }} />
                {coin.name} ({coin.symbol})
              </>
            }
            description={`$${parseFloat(coin.price).toFixed(2)}`}
          />
          <Tag
            color={type === 'gain' ? 'green' : 'red'}
            style={{ fontWeight: 'bold' }}
          >
            {type === 'gain' ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {coin.change}%
          </Tag>
        </List.Item>
      )}
    />
  );

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Card
          title={<Title level={4} style={{ marginBottom: 0 }}>Top Gainers (24h)</Title>}
          style={{ borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
        >
          {renderList(topGainers, 'gain')}
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card
          title={<Title level={4} style={{ marginBottom: 0 }}>Top Losers (24h)</Title>}
          style={{ borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
        >
          {renderList(topLosers, 'loss')}
        </Card>
      </Col>
    </Row>
  );
};

export default TopMovers;
