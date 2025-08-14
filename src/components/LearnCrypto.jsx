import React, { useState, useEffect } from "react";
import { Card, Typography, Row, Col, Spin, Statistic, Button } from "antd";

const { Title, Paragraph } = Typography;

const topics = [
  {
    title: "📜 What is Blockchain?",
    content:
      "Blockchain is a decentralized digital ledger that records transactions across multiple computers so that the record cannot be altered retroactively. It ensures transparency, security, and trust in digital transactions."
  },
  {
    title: "💹 Basics of Crypto Trading",
    content:
      "Crypto trading involves buying and selling cryptocurrencies with the goal of making a profit. Traders use strategies such as day trading, swing trading, and long-term holding, depending on market trends."
  },
  {
    title: "🔐 Security & Wallets",
    content:
      "A crypto wallet is a secure digital tool for storing your cryptocurrencies. There are two main types: Hot Wallets (online) for quick access, and Cold Wallets (offline) for higher security."
  }
];

const CryptoEduLive = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/search/trending");
        const data = await res.json();
        setCoins(data.coins);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
        Beginner's Guide + Live Market Trends
      </Title>

      {/* Educational Content */}
      <Row gutter={[20, 20]} style={{ marginBottom: 40 }}>
        {topics.map((topic, index) => (
          <Col xs={24} md={8} key={index}>
            <Card
              bordered
              hoverable
              style={{
                height: "100%",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
              }}
            >
              <Title level={4}>{topic.title}</Title>
              <Paragraph style={{ fontSize: "15px", color: "#555" }}>
                {topic.content}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Live Trending Coins */}
      <Title level={3} style={{ marginBottom: 20 }}>
        🔥 Live Trending Coins (via CoinGecko)
      </Title>
      {loading ? (
        <Spin tip="Fetching live crypto data..." />
      ) : (
        <Row gutter={[20, 20]}>
          {coins.map((coin, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                hoverable
                style={{
                  borderRadius: "10px",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}
              >
                <img
                  src={coin.item.large}
                  alt={coin.item.name}
                  style={{ width: 50, height: 50, marginBottom: 10 }}
                />
                <Statistic
                  title={coin.item.name}
                  value={coin.item.data.price}
                  valueStyle={{ fontSize: "18px" }}
                />
                <Button
                  type="link"
                  href={`https://www.coingecko.com/en/coins/${coin.item.id}`}
                  target="_blank"
                >
                  View Details
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default CryptoEduLive;
