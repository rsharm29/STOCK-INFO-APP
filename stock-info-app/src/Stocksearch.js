// src/StockSearch.js
import React, { useState } from 'react';
import axios from 'axios';

function StockSearch() {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState('');

  const fetchStock = async () => {
    try {
      const apiKey = process.env.REACT_APP_TWELVE_DATA_API_KEY;
      const url = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}`;
      const response = await axios.get(url);

      if (response.data.code) {
        setError('Invalid symbol or API error.');
        setStockData(null);
      } else {
        setStockData(response.data);
        setError('');
      }
    } catch (err) {
      setError('Error fetching stock data.');
    }
  };

  return (
    <div className="stock-search">
      <h2>Stock Lookup</h2>
      <input
        type="text"
        placeholder="Enter stock symbol (e.g., AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
      />
      <button onClick={fetchStock}>Search</button>

      {error && <p className="error">{error}</p>}

      {stockData && (
        <div className="stock-info">
          <h3>{stockData.name} ({stockData.symbol})</h3>
          <p>Price: ${stockData.close}</p>
          <p>Change: {stockData.percent_change}%</p>
          <p>Average Volume: {stockData.average_volume}</p>
          <p>Previous Close: {stockData.previous_close}</p>
        </div>
      )}
    </div>
  );
}

export default StockSearch;
