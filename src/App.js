import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import {  Homepage, Cryptocurrencies, CryptoDetails, Navbar, Converter, TopMovers, Portfolio, LearnCrypto } from './components';
import './App.css';

const App = () => (
  <div className="app">
    <div className="navbar">
      <Navbar />
    </div>
    <div className="main">
      <Layout>
        <div className="routes">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            
            <Route exact path="/cryptocurrencies">
              <Cryptocurrencies />
            </Route>
            <Route exact path="/crypto/:coinId">
              <CryptoDetails />
            </Route>
            <Route exact path="/converter">
              <Converter />
            </Route>
            <Route exact path="/topmovers">
              <TopMovers />
            </Route>
            <Route exact path="/portfolio">
              <Portfolio />
            </Route>
            <Route exact path="/learncrypto">
              <LearnCrypto />
            </Route>
          </Switch>
        </div>
      </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2021
          <Link to="/">
            Cryptoverse Inc.
          </Link> <br />
          All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          <Link to="/portfolio">Portfolio</Link> 
          <Link to="/converter">Converter</Link>
          <Link to="/topmovers">Top Movers</Link>
        </Space>
      </div>
    </div>
  </div>
);

export default App;
